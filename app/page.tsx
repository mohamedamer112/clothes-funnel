"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbwtowFfZZ1u_Cu3EOe4AOr5Ui5LSNvz2ySi6EKLUUZTyRmjnk_kCdNpEx7CS23R3Lai/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
    } catch (err) {
      setError("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <p className="text-yellow-400 font-bold text-lg mb-3">🔥 عرض محدود لفترة قصيرة</p>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          أحدث صيحات الموضة<br />
          <span className="text-yellow-400">بخصم يصل لـ 50%</span>
        </h1>
        <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
          سجّل بياناتك الآن واحصل على عروضنا الحصرية قبل أي أحد
        </p>
        <a href="#form" className="bg-yellow-400 text-black font-black text-xl px-10 py-4 rounded-full hover:bg-yellow-300 transition">
          احصل على العرض الآن ⬇️
        </a>
      </section>

      {/* المميزات */}
      <section className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { icon: "👗", title: "أحدث التصاميم", desc: "كل أسبوع وصول جديد من أشهر الماركات" },
          { icon: "💰", title: "أسعار لا تقاوم", desc: "خصومات حصرية للمشتركين في القائمة" },
          { icon: "🚚", title: "توصيل سريع", desc: "توصيل لباب بيتك في أقل من 48 ساعة" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-800 rounded-2xl p-6">
            <div
