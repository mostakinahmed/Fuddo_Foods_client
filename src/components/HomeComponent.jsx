import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Truck,
  Award,
  CheckCircle2,
  Star,
  ChevronDown,
  X,
  Plus,
  
  Minus,
  Trash2,
  HeartHandshake,
  Leaf,
  PhoneCall,
  ArrowRight,
  Menu,
  Clock,
  MapPin,
  Flame,
} from "lucide-react";

// Google Fonts: Hind Siliguri inject
const FontInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Hind Siliguri', sans-serif;
    }

    .amber-gradient {
      background: linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%);
    }

    .warm-glow {
      box-shadow: 0 10px 30px -10px rgba(180, 83, 9, 0.3);
    }
  `}</style>
);

// Products Data
const PRODUCTS = [
  {
    id: 1,
    name: "যশোরের প্রিমিয়াম পাটালি গুড়",
    subtitle: "১০০% চিনিমুক্ত ও গাঢ় সুবাসযুক্ত শক্ত পাটালি",
    tag: "সর্বোচ্চ বিক্রিত",
    rating: 4.9,
    reviews: 142,
    sizes: [
      { weight: "১ কেজি", price: 650, original: 750 },
      { weight: "৫০০ গ্রাম", price: 350, original: 400 },
    ],
    features: [
      "হাতে তৈরি নিখুঁত পাটালি",
      "কোনো প্রকার চিনি বা হাইড্রোজ মুক্ত",
      "মিষ্টি গন্ধ ও খাঁটি স্বাদ",
    ],
    accentColor: "from-amber-700 to-amber-900",
    icon: "🪵",
  },
  {
    id: 2,
    name: "দানাদার খাঁটি নলেন গুড়",
    subtitle: "শীতের প্রথম রস থেকে তৈরি নরম দানাদার গুড়",
    tag: "স্পেশাল কালেকশন",
    rating: 5.0,
    reviews: 98,
    sizes: [
      { weight: "১ কেজি", price: 720, original: 820 },
      { weight: "৫০০ গ্রাম", price: 380, original: 430 },
    ],
    features: [
      "জিভে দিলে মিলিয়ে যাওয়া টেক্সচার",
      "পায়েস ও পিঠার জন্য সেরা",
      "ভোরে নামানো কাঁচা রসে তৈরি",
    ],
    accentColor: "from-yellow-700 to-amber-800",
    icon: "🍯",
  },
  {
    id: 3,
    name: "ঐতিহ্যবাহী ঝোলা গুড় (তরল নলেন)",
    subtitle: "কাঁচের জারে সংরক্ষিত ঘন সোনালী তরল গুড়",
    tag: "জনপ্রিয় পিঠার সঙ্গী",
    rating: 4.8,
    reviews: 86,
    sizes: [
      { weight: "১ কেজি (জার)", price: 680, original: 780 },
      { weight: "৫০০ গ্রাম (জার)", price: 360, original: 420 },
    ],
    features: [
      "কাঁচের নিরাপদ ফুটপ্রুফ বয়াম",
      "চিতই ও রুটির সাথে অনবদ্য",
      "প্রাকৃতিক উজ্জ্বল গাঢ় রঙ",
    ],
    accentColor: "from-amber-800 to-orange-950",
    icon: "🏺",
  },
  {
    id: 4,
    name: "ফুদ্দো ফ্যামিলি মেগা কম্বো",
    subtitle: "১ কেজি পাটালি + ১ কেজি ঝোলা + ৫০০ গ্রাম নলেন",
    tag: "সেরা অফার (১০% ছাড়)",
    rating: 5.0,
    reviews: 215,
    sizes: [{ weight: "মোট ২.৫ কেজি প্যাকেজ", price: 1550, original: 1850 }],
    features: [
      "সব স্বাদের এক রাজকীয় উপহার",
      "বিনামূল্যে সুন্দর প্যাকেজিং",
      "সীমিত সময়ের জন্য অফার মূল্য",
    ],
    accentColor: "from-amber-900 to-stone-900",
    icon: "🎁",
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "শায়লা পারভীন",
    location: "উত্তরা, ঢাকা",
    rating: 5,
    comment:
      "যশোরের আসল গুড়ের যে সুবাস সেটা অনেকদিন পর পেলাম। নলেন গুড় দিয়ে পায়েস বানিয়েছিলাম, পুরো ঘর ঘ্রাণে ভরে গিয়েছিল! ধন্যবাদ ফুদ্দো ফুডসকে।",
  },
  {
    name: "তানভীর আহমেদ",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    comment:
      "চিনি মেশানো গুড় চিনতে ভুল হয় না। কিন্তু এদের পাটালি গুড়টা সত্যি ১০০% খাঁটি ও অরগানিক। মিষ্টির অনুপাতটা একদম পারফেক্ট ছিল।",
  },
  {
    name: "ডাঃ মোস্তাফিজুর রহমান",
    location: "চট্টগ্রাম সদর",
    rating: 5,
    comment:
      "অনলাইনে এমন নিখুঁত ও স্বাস্থ্যসম্মত কাঁচের জারে ঝোলা গুড়ের ডেলিভারি পাব ভাবিনি। প্যাকেজিং আর পণ্যের মান প্রশংসনীয়।",
  },
];

// FAQs Data
const FAQS = [
  {
    q: "ফুদ্দো ফুডসের খেজুর গুড় আসলেই কি শতভাগ চিনি ও কেমিক্যালমুক্ত?",
    a: "হ্যাঁ, সম্পূর্ণ নিশ্চিত থাকুন। আমাদের গুড় যশোরের নিজস্ব গাছিদের মাধ্যমে শীতের ভোরের তাজা রস থেকে ঐতিহ্যবাহী মাটির চুলায় কাঠের জ্বাল দিয়ে তৈরি হয়। এতে কোনো চিনি, হাইড্রোজ, সোডা বা কেমিক্যাল ব্যবহার করা হয় না।",
  },
  {
    q: "গুড় খাঁটি কিনা ঘরে বসে কীভাবে পরীক্ষা করব?",
    a: "খাঁটি গুড়ের একটি টুকরো কুসুম গরম পানিতে বা দুধে দিলে দুধ কেটে যাবে না। এছাড়া খাঁটি খেজুর গুড় মুখে দিলে কোনো কড়া খসখসে চিনির ভাব থাকে না, বরং জিহ্বায় মসৃণভাবে গলে যায় এবং গাঢ় মিষ্টি সুবাস ছড়িয়ে পড়ে।",
  },
  {
    q: "ডেলিভারি পেতে কতদিন সময় লাগবে এবং খরচ কত?",
    a: "ঢাকার ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে (চার্জ ৭০ টাকা) এবং ঢাকার বাইরে ২ থেকে ৩ দিনের মধ্যে (চার্জ ১৩০ টাকা) ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি পৌঁছে দেওয়া হয়।",
  },
  {
    q: "গুড় দীর্ঘদিন ভালো রাখার উপায় কী?",
    a: "পাটালি গুড় শুকনো ও বায়ুরোধী পাত্রে সাধারণ তাপমাত্রায় রেখে দিলে ২-৩ মাস ভালো থাকে। ঝোলা ও নলেন গুড় কাঁচের বয়ামে ফ্রিজের নরমাল চেম্বারে রাখলে ৬ মাস পর্যন্ত তার আসল সুবাস ও স্বাদ অটুট থাকে।",
  },
];

export default function App() {
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Checkout Form State
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryArea: "inside_dhaka",
    notes: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to Cart
  const addToCart = (product, sizeIndex) => {
    const selectedSize = product.sizes[sizeIndex];
    const cartItemId = `${product.id}-${sizeIndex}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            weight: selectedSize.weight,
            price: selectedSize.price,
            quantity: 1,
            icon: product.icon,
          },
        ];
      }
    });

    showToast(
      `"${product.name} (${selectedSize.weight})" কার্টে যোগ করা হয়েছে!`,
    );
  };

  // Direct Quick Order Action
  const handleQuickBuy = (product, sizeIndex) => {
    addToCart(product, sizeIndex);
    const checkoutEl = document.getElementById("checkout-section");
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cart Qty Adjust
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharge =
    cart.length === 0
      ? 0
      : orderForm.deliveryArea === "inside_dhaka"
        ? 70
        : 130;
  const totalAmount = subtotal + deliveryCharge;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Submit Order
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("অনুগ্রহ করে অন্তত একটি পণ্য কার্টে যোগ করুন!");
      return;
    }
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      showToast("দয়া করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন!");
      return;
    }

    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      <FontInjector />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-amber-950 text-amber-50 px-5 py-3 rounded-xl shadow-2xl border border-amber-600/40 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm md:text-base font-medium">
            {toastMessage}
          </span>
        </div>
      )}

     

      {/* Sticky Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:h-18 h-13 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="md:w-33 w-20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="" />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold text-stone-700">
            <a href="#about" className="hover:text-amber-800 transition-colors">
              আমাদের বৈশিষ্ট্য
            </a>
            <a
              href="#products"
              className="hover:text-amber-800 transition-colors"
            >
              গুড়ের ধরন
            </a>
            <a
              href="#testimonials"
              className="hover:text-amber-800 transition-colors"
            >
              গ্রাহকদের মতামত
            </a>
            <a href="#faq" className="hover:text-amber-800 transition-colors">
              সাধারণ জিজ্ঞাসা
            </a>
          </nav>

          {/* Actions: Hotline & Cart */}
          <div className="flex items-center gap-3">
            <a
              href="tel:01700000000"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-amber-50/60 text-amber-900 font-semibold text-sm hover:bg-amber-100 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>০১৭০০-০০০০০০</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full bg-amber-900 text-amber-50 hover:bg-amber-800 transition shadow-md hover:shadow-lg flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-amber-50"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-amber-100 px-4 py-4 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-700 font-medium hover:text-amber-800"
            >
              আমাদের বৈশিষ্ট্য
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-700 font-medium hover:text-amber-800"
            >
              গুড়ের ধরন ও দাম
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-700 font-medium hover:text-amber-800"
            >
              গ্রাহকদের মতামত
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-700 font-medium hover:text-amber-800"
            >
              সাধারণ প্রশ্ন
            </a>
            <div className="pt-2 border-t border-stone-100">
              <a
                href="tel:01700000000"
                className="flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-amber-100 text-amber-900 font-bold text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>সরাসরি কল করুন: ০১৭১১-XXXXXX</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* FUDDO FOODS - HERO SECTION */}
      <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[680px] overflow-hidden bg-[#17351D]">
        {/* Background Image */}
        <img
          src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/8ccae890-bdef-4406-a353-091d66bb1bdd.png"
          alt="Fuddo Foods Traditional Khejur Gur"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102515]/90 via-[#102515]/65 to-transparent" />

        {/* Bottom Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102515]/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-[520px] sm:min-h-[580px] lg:min-h-[680px] px-5  flex items-center">
          <div className="max-w-xl text-center lg:text-left py-16">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-300/40 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-200 text-sm font-semibold">
                বাংলার ঐতিহ্যবাহী স্বাদ
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.3] tracking-tight">
              রাজশাহীর
              <span className="block text-[#FFD477] mt-1">ঐতিহ্যবাহী</span>
              <span className="block mt-1">খেজুরের গুড়</span>
            </h1>

            {/* Highlight Divider */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-6 mb-5">
              <div className="w-16 h-1 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-amber-200" />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/90 leading-[1.9] max-w-lg mx-auto lg:mx-0">
              শীতের আমেজে উপভোগ করুন খেজুরের গুড়ের মিষ্টি ঘ্রাণ ও ঐতিহ্যবাহী
              স্বাদ। বাংলার চিরচেনা স্বাদ পৌঁছে যাক আপনার ঘরে।
            </p>

            {/* Product Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
              {["পাটালি গুড়", "ঝোলা গুড়", "দানাদার গুড়"].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/25 text-white text-sm font-semibold backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#F5B942] to-[#D88B20] text-[#30200A] font-extrabold text-base shadow-xl shadow-black/20 hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                এখনই অর্ডার করুন
                <ShoppingBag className="w-5 h-5" />
              </a>

              <a
                href="#products"
                className="text-white font-semibold text-sm sm:text-base underline underline-offset-4 decoration-amber-400 hover:text-amber-300 transition-colors"
              >
                আমাদের পণ্য দেখুন
              </a>
            </div>

            {/* Website */}
            <p className="mt-8 text-amber-100/80 text-sm font-medium tracking-wide">
              www.fuddofoods.shop
            </p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </section>

      {/* WHY CHOOSE US / VALUE PROPOSITIONS */}
      <section
        id="about"
        className="py-16 bg-white border-y border-amber-100/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
              কেন ফুদ্দো ফুডস সেরা?
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900">
              বাজারে ভেজালের ভিড়ে আমরা দিচ্ছি ১০০% খাঁটি ও বিশুদ্ধতার নিশ্চয়তা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🌱
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                চিনি ও কেমিক্যালমুক্ত
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                কোনো চিনি, হাইড্রোজ কিংবা কৃত্রিম রঙ মেশানো হয় না। শুধুমাত্র
                ভোরের মিষ্টি খেজুর রস ফুটিয়ে তৈরি।
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏺
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                ঐতিহ্যবাহী গাছিদের তৈরি
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                যশোরের বংশপরম্পরায় অভিজ্ঞ গাছিদের হাতে মাটির চুলায় কাঠের জ্বাল
                দিয়ে তৈরি হওয়ায় এর সুবাস অটুট থাকে।
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📦
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                নিরাপদ ফুড-গ্রেড প্যাকিং
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                স্বাস্থ্যকর পরিবেশে কাঁচের বয়াম ও মজবুত ফুড-গ্রেড বক্সে প্যাক
                করা হয় যাতে গুড়ের মান ও স্বাদ নষ্ট না হয়।
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-800 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🚚
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                দেখে নেওয়ার সুবিধা
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা। পণ্য হাতে পেয়ে ঘ্রাণ ও
                মান যাচাই করে মূল্য পরিশোধ করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SECTION */}
      <section id="products" className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              আমাদের প্রিমিয়াম কালেকশন
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4">
              আপনার পছন্দের খাঁটি খেজুর গুড় বেছে নিন
            </h2>
            <p className="text-base text-stone-600">
              প্রত্যেকটি পণ্য সরাসরি যশোর থেকে সংগ্রহ করা এবং শতভাগ ভেজালমুক্তির
              গ্যারান্টিযুক্ত।
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => {
              const currentSizeIndex = selectedVariants[product.id] || 0;
              const activeVariant = product.sizes[currentSizeIndex];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-amber-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Tag & Visual Box */}
                    <div className="relative p-6 bg-gradient-to-b from-amber-50 to-white text-center border-b border-amber-100">
                      <span className="absolute top-4 left-4 bg-amber-900 text-amber-100 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {product.tag}
                      </span>

                      <div className="text-6xl my-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                        {product.icon}
                      </div>

                      <div className="flex items-center justify-center gap-1 text-amber-500 text-sm font-semibold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-stone-400 text-xs">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 mb-4 leading-relaxed">
                        {product.subtitle}
                      </p>

                      {/* Weight Selector */}
                      <div className="mb-5">
                        <div className="text-xs font-semibold text-stone-500 mb-2">
                          পরিমাণ নির্বাচন করুন:
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {product.sizes.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                setSelectedVariants({
                                  ...selectedVariants,
                                  [product.id]: idx,
                                })
                              }
                              className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                                currentSizeIndex === idx
                                  ? "bg-amber-900 text-white border-amber-900 shadow-sm"
                                  : "bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400"
                              }`}
                            >
                              {s.weight}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-1.5 mb-6 text-xs text-stone-600">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Price & Actions */}
                  <div className="p-6 pt-0">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-2xl font-black text-amber-950">
                          ৳{activeVariant.price}
                        </span>
                        <span className="text-xs text-stone-400 line-through ml-2">
                          ৳{activeVariant.original}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        সাশ্রয় ৳{activeVariant.original - activeVariant.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(product, currentSizeIndex)}
                        className="w-full py-2.5 px-3 rounded-xl border border-amber-800 text-amber-900 font-bold text-xs hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>কার্টে নিন</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuickBuy(product, currentSizeIndex)
                        }
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>অর্ডার করুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIRECT EASY CHECKOUT SECTION */}
      <section
        id="checkout-section"
        className="py-16 bg-gradient-to-b from-white to-amber-50/60 border-t border-amber-200/60"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
              সহজ অর্ডার প্রক্রিয়া
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 mt-2">
              ফর্মটি পূরণ করে সরাসরি অর্ডার করুন
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              কোনো অগ্রিম পেমেন্ট ছাড়া পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন (ক্যাশ
              অন ডেলিভারি)
            </p>
          </div>

          {orderPlaced ? (
            /* Order Success State */
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-emerald-500 shadow-xl max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                ✓
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
                ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।
              </h3>
              <p className="text-stone-600 text-base mb-6">
                ফুদ্দো ফুডস কাস্টমার প্রতিনিধি শীঘ্রই{" "}
                <span className="font-bold text-stone-800">
                  {orderForm.phone}
                </span>{" "}
                নম্বরে কল করে অর্ডারটি কনফার্ম করবেন।
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl text-left text-sm space-y-2 border border-stone-200 mb-6">
                <div>
                  <span className="font-semibold text-stone-600">
                    গ্রাহকের নাম:
                  </span>{" "}
                  {orderForm.name}
                </div>
                <div>
                  <span className="font-semibold text-stone-600">
                    ডেলিভারি ঠিকানা:
                  </span>{" "}
                  {orderForm.address}
                </div>
                <div>
                  <span className="font-semibold text-stone-600">
                    মোট প্রদেয় মূল্য:
                  </span>{" "}
                  <span className="text-amber-900 font-bold">
                    ৳{totalAmount} (ক্যাশ অন ডেলিভারি)
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCart([]);
                  setOrderPlaced(false);
                  setOrderForm({
                    name: "",
                    phone: "",
                    address: "",
                    deliveryArea: "inside_dhaka",
                    notes: "",
                  });
                }}
                className="px-8 py-3 bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-xl shadow-md transition"
              >
                আরেকটি অর্ডার করুন
              </button>
            </div>
          ) : (
            /* Checkout Box Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Customer Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-md">
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                    <span>১. আপনার ডেলিভারি তথ্য</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                      value={orderForm.name}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      সচল মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="যেমন: ০১৭১১-XXXXXX"
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/উপজেলা){" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="যেমন: বাসা নং ১২, রোড নং ৫, সেক্টর ৪, উত্তরা, ঢাকা"
                      value={orderForm.address}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, address: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-amber-700 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      ডেলিভারি এলাকা নির্বাচন করুন:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                          orderForm.deliveryArea === "inside_dhaka"
                            ? "bg-amber-50 border-amber-800 text-amber-900"
                            : "border-stone-200 text-stone-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryArea"
                            checked={orderForm.deliveryArea === "inside_dhaka"}
                            onChange={() =>
                              setOrderForm({
                                ...orderForm,
                                deliveryArea: "inside_dhaka",
                              })
                            }
                            className="accent-amber-800"
                          />
                          <span>ঢাকার ভেতরে</span>
                        </div>
                        <span className="font-bold">৳৭০</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                          orderForm.deliveryArea === "outside_dhaka"
                            ? "bg-amber-50 border-amber-800 text-amber-900"
                            : "border-stone-200 text-stone-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryArea"
                            checked={orderForm.deliveryArea === "outside_dhaka"}
                            onChange={() =>
                              setOrderForm({
                                ...orderForm,
                                deliveryArea: "outside_dhaka",
                              })
                            }
                            className="accent-amber-800"
                          />
                          <span>ঢাকার বাইরে</span>
                        </div>
                        <span className="font-bold">৳১৩০</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      পেমেন্ট পদ্ধতি:
                    </label>
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs font-semibold text-stone-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা দিন)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        নিরাপদ
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                    <span>অর্ডার কনফার্ম করুন (৳{totalAmount})</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Live Order Summary */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-md">
                <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center justify-between">
                  <span>২. অর্ডারের বিবরণ</span>
                  <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    {totalCartCount} টি আইটেম
                  </span>
                </h3>

                {cart.length === 0 ? (
                  <div className="py-10 text-center">
                    <div className="text-4xl mb-2">🛒</div>
                    <p className="text-stone-500 text-sm">
                      আপনার কার্ট বর্তমানে খালি আছে!
                    </p>
                    <a
                      href="#products"
                      className="inline-block mt-3 text-xs font-bold text-amber-800 underline"
                    >
                      পছন্দের গুড় যোগ করতে এখানে ক্লিক করুন
                    </a>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 mt-2">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-900">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-stone-500">
                              {item.weight} • ৳{item.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-amber-800 text-stone-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-amber-800 text-stone-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-stone-900 w-12 text-right">
                            ৳{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Cost Breakdown */}
                    <div className="pt-4 space-y-2 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>মোট পণ্যের মূল্য:</span>
                        <span className="font-semibold text-stone-900">
                          ৳{subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>ডেলিভারি চার্জ:</span>
                        <span className="font-semibold text-stone-900">
                          ৳{deliveryCharge}
                        </span>
                      </div>
                      <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-extrabold text-amber-950">
                        <span>সর্বমোট প্রদেয় বিল:</span>
                        <span className="text-lg">৳{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust mini-box */}
                <div className="mt-6 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-stone-700 flex items-center gap-3">
                  <div className="text-2xl">🤝</div>
                  <div className="leading-snug">
                    <span className="font-bold text-stone-900">
                      ফুদ্দো ফুডস ওয়াদা:
                    </span>{" "}
                    গুড় হাতে পেয়ে গন্ধ ও রঙ দেখে টাকা দেওয়ার ১০০% স্বাধীনতা
                    রয়েছে আপনার।
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CUSTOMER REVIEWS / TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full">
              গ্রাহকের সন্তুষ্টি
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 mt-2">
              আমাদের ক্রেতারা যা বলছেন
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-amber-50/40 border border-amber-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>
                <div className="border-t border-amber-100/80 pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">{t.location}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        id="faq"
        className="py-16 bg-[#FFFDF9] border-t border-amber-100"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
              সাধারণ জিজ্ঞাসা (FAQ)
            </h2>
            <p className="text-sm text-stone-600">
              গুড় ও অর্ডার সংক্রান্ত গুরুত্বপূর্ণ প্রশ্নের উত্তর
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-amber-200/70 bg-white overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-bold text-sm sm:text-base text-stone-800 flex items-center justify-between gap-4 hover:text-amber-900"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 border-t border-amber-50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SLIDE-OVER / CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-800" />
                  <h3 className="font-bold text-base text-stone-900">
                    আপনার শপিং ব্যাগ ({totalCartCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:bg-stone-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-stone-400">
                    <div className="text-5xl mb-3">🧺</div>
                    <p className="text-sm font-medium">ব্যাগে কোনো পণ্য নেই</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200/80 gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-stone-900">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {item.weight} • ৳{item.price}
                          </div>
                          <div className="font-bold text-xs text-amber-900 mt-1">
                            ৳{item.price * item.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-stone-600 hover:text-amber-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-stone-600 hover:text-amber-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-stone-900">
                    <span>উপমোট (Subtotal):</span>
                    <span className="text-lg text-amber-950">৳{subtotal}</span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    *ডেলিভারি চার্জ চেকআউটের সময় নির্ধারণ করা হবে
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const el = document.getElementById("checkout-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>অর্ডারের জন্য এগিয়ে যান</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
