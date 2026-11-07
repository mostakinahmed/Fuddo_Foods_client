import React from "react";
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

export default function BDGeoFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍯</span>
              <span className="text-2xl font-bold text-white tracking-wide">
                ফুদ্দো ফুডস
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              ফুদ্দো ফুডস (Fuddo Foods) আপনাদের জন্য নিয়ে এসেছে যশোরের প্রত্যন্ত
              অঞ্চলের খাঁটি, ঐতিহ্যবাহী ও চিনিমুক্ত খেজুরের গুড়। আমরা বিশুদ্ধ
              খাদ্য সবার ঘরে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="text-xs text-amber-400 font-semibold">
              ✓ ১০০% প্রাকৃতিক ও স্বাস্থ্যসম্মত
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              আমাদের পণ্যসমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-amber-300 transition">
                  যশোরের খাঁটি পাটালি গুড়
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition">
                  দানাদার নলেন গুড়
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition">
                  কাঁচের বয়ামের তরল ঝোলা গুড়
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition">
                  ফ্যামিলি মেগা কম্বো প্যাকেজ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              জরুরি হেল্পলাইন
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>০১৭০০-০০০০০০ (সকাল ৯টা - রাত ১০টা)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>যশোর / ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>ডেলিভারি সময়: ২৪ - ৭২ ঘণ্টা</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              রিটার্ন পলিসি
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              পণ্য গ্রহণের সময় প্যাকেজিং বা মানে কোনো ত্রুটি পেলে সাথে সাথে
              ডেলিভারি ম্যানের কাছে ফেরত দিতে পারবেন।
            </p>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
              🔒 ক্যাশ অন ডেলিভারি এবং নিরাপদে পণ্য বুঝে নিয়ে পেমেন্ট করার
              নিশ্চয়তা।
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} ফুদ্দো ফুডস (Fuddo Foods). সর্বস্বত্ব
            সংরক্ষিত।
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition">
              গোপনীয়তা নীতি
            </a>
            <span>•</span>
            <a href="#" className="hover:text-amber-400 transition">
              শর্তাবলী
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
