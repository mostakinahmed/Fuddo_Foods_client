import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AdminSales = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Resend states
  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);

  // INITIAL AUTH CHECK
  // --------------------------------------------------
  const hasRequestedSMS = useRef(false);

  useEffect(() => {
    const handleInitialCheck = async () => {
      // Only trigger if it hasn't been called yet during this session mount
      if (!hasRequestedSMS.current) {
        hasRequestedSMS.current = true;
        try {
          await axios.post(
            "https://api-bhumi.mostakinahmed.com/api/security-code",
          );
        } catch (err) {
          console.error("Failed to send login alert", err);
        }
      }
    };

    handleInitialCheck();
  }, []);

  // --------------------------------------------------
  // RESEND COUNTDOWN
  // --------------------------------------------------
  useEffect(() => {
    // Don't run timer if already authenticated
    if (isAuthenticated) {
      return;
    }

    // Timer finished
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer, isAuthenticated]);

  // --------------------------------------------------
  // VERIFY SECURITY CODE
  // --------------------------------------------------
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Please enter your security code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-bhumi.mostakinahmed.com/api/verify-security",
        {
          code,
        },
      );

      if (response.data.success) {
        setIsAuthenticated(true);

        // Save session
        localStorage.setItem("admin_auth", "true");

        // Use sales returned by verification API
        setSalesData(response.data.sales || []);

        // Clear code
        setCode("");
      } else {
        setError(
          response.data.message || "Invalid security code. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid security code. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // RESEND SECURITY CODE
  // --------------------------------------------------
  const handleResendCode = async () => {
    // Prevent clicking while countdown is active
    if (resendTimer > 0 || resending) {
      return;
    }

    try {
      setResending(true);
      setError("");

      await axios.post("https://api-bhumi.mostakinahmed.com/api/security-code");

      // Clear old code
      setCode("");

      // Reset timer to 30 seconds
      setResendTimer(30);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to resend the code. Please try again.",
      );
    } finally {
      setResending(false);
    }
  };

  // --------------------------------------------------
  // LOGOUT / LOCK SESSION
  const handleLogout = async () => {
    // Redirect to home route
    window.location.href = "/";
  };

  console.log(salesData);
  return (
    <div className="min-h-screen bg-slate-900/5 p-4 sm:p-8 font-sans">
      {/* ==================================================
      SECURITY MODAL
  ================================================== */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
            <div className="p-6 sm:p-8">
              {/* HEADER */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.5 12l1.7 1.7 3.5-3.5"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Hey, Mostakin
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Secure access verification required to continue
                  </p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Enter 6-digit security code
                  </label>

                  <div className="flex justify-between gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`security-code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={code[index] || ""}
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        autoFocus={index === 0}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");

                          if (!value) {
                            const newCode = code.split("");
                            newCode[index] = "";
                            setCode(newCode.join(""));
                            return;
                          }

                          const newCode = code.split("");
                          newCode[index] = value;
                          setCode(newCode.join("").slice(0, 6));

                          if (index < 5) {
                            document
                              .getElementById(`security-code-${index + 1}`)
                              ?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !code[index] &&
                            index > 0
                          ) {
                            document
                              .getElementById(`security-code-${index - 1}`)
                              ?.focus();
                          }
                          if (e.key === "ArrowLeft" && index > 0) {
                            document
                              .getElementById(`security-code-${index - 1}`)
                              ?.focus();
                          }
                          if (e.key === "ArrowRight" && index < 5) {
                            document
                              .getElementById(`security-code-${index + 1}`)
                              ?.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pastedCode = e.clipboardData
                            .getData("text")
                            .replace(/\D/g, "")
                            .slice(0, 6);

                          if (!pastedCode) return;
                          setCode(pastedCode);
                          const nextIndex = Math.min(pastedCode.length, 5);
                          document
                            .getElementById(`security-code-${nextIndex}`)
                            ?.focus();
                        }}
                        className={`h-12 w-11 rounded-xl border bg-slate-50/50 text-center text-lg font-bold text-slate-900 outline-none transition-all ${
                          error
                            ? "border-rose-300 bg-rose-50/50 text-rose-700 focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                            : "border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        }`}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="mt-2.5 text-center text-xs font-semibold text-rose-600 animate-shake">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-90"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Verifying Identity...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </form>

              {/* RESEND */}
              <div className="mt-5 flex items-center justify-center gap-1.5 text-xs">
                <span className="text-slate-400">Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0 || resending}
                  className={`font-semibold transition-colors ${
                    resendTimer > 0 || resending
                      ? "cursor-not-allowed text-slate-400"
                      : "text-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  {resending
                    ? "Sending..."
                    : resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : "Resend code"}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
                <a
                  href="/"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go to Home Page
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
      SALES DASHBOARD LIST
  ================================================== */}
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white px-6 py-4 rounded border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Protected Sales List
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Verified Access
              </span>
            )}

            <button
              onClick={handleLogout}
              className="rounded-full bg-rose-50 px-5 py-1.5 text-xs font-semibold text-rose-700 transition-all hover:bg-rose-100 border border-rose-100"
            >
              Log out
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER WITH FIXED HEIGHT & AUTO SCROLL */}
        <div className="overflow-hidden rounded border pb-6 border-slate-100 bg-white shadow-sm">
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto relative scrollbar-thin scrollbar-thumb-slate-200">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
                <tr className="text-xs font-bold uppercase tracking-wider text-black bg-green-100">
                  <th className="whitespace-nowrap px-6 py-4">Sale ID</th>
                  <th className="whitespace-nowrap px-6 py-4">Customer Name</th>
                  <th className="whitespace-nowrap px-6 py-4">Phone Number</th>
                  <th className="whitespace-nowrap px-6 py-4">Service Type</th>
                  <th className="whitespace-nowrap px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-600 bg-white">
                {salesData.length > 0 ? (
                  salesData.map((sale, index) => (
                    <tr
                      key={sale.saleId || index}
                      className="transition-colors hover:bg-slate-100 group"
                    >
                      <td className="whitespace-nowrap px-6 py-2 font-mono text-xs font-semibold text-slate-700">
                        {sale.saleId || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-2 font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {sale.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-2 text-slate-500 font-mono text-xs">
                        {sale.phone}
                      </td>

                      <td className="whitespace-nowrap px-6 py-2 text-slate-600 font-medium">
                        {sale.serviceType}
                      </td>

                      <td className="whitespace-nowrap px-6 py-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 capitalize border border-emerald-100">
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-16 text-center text-slate-400"
                    >
                      {isAuthenticated
                        ? "No sales records available in database."
                        : "Complete identity verification above to view data."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-6 mt-16 font-sans">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-sm font-semibold text-white tracking-wide">
                Bhumi API & Systems
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                High-performance geographical data services & automated
                architecture.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs bg-slate-800/60 border border-slate-700/50 px-4 py-3 rounded-xl shadow-inner">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-300">Designed & Developed by</span>
                <a
                  href="https://mostakinahmed.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white tracking-wide hover:text-emerald-400 transition-colors underline decoration-slate-600 underline-offset-4"
                >
                  Mostakin Ahmed
                </a>
              </div>

              {/* Social Links Icons */}
              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-700/60 pt-2 sm:pt-0 sm:pl-3">
                {/* GitHub */}
                <a
                  href="https://github.com/mostakinahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/mostakinahmed1971"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/mostakinahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminSales;
