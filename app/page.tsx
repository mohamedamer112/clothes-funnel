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

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbz_WCQCsn22F9v3DHLzzWtN74VdUeHuoNt2b2sCKXQ5KKcXfozgfTSgfzOpl9Xw7Ns/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formBody = new URLSearchParams();
      formBody.append("name", formData.name);
      formBody.append("phone", formData.phone);
      formBody.append("email", formData.email);
      formBody.append("message", formData.message);

      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });
      setSuccess(true);
    } catch {
      setError("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-yellow-400 mb-2">تم التسجيل بنجاح!</h2>
          <p className="text-gray-300">هنتواصل معك قريباً بأحسن العروض</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <section className="text-center py-20 px-4">
        <p className="text-yellow-400 font-bold text-lg mb-3">🔥 عرض محدود لفترة قصيرة</p>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          أحدث صيحات الموضة
          <br />
          <span className="text-yellow-400">بخصم يصل لـ 50%</span>
        </h1>
        <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
          سجّل بياناتك الآن واحصل على عروضنا الحصرية قبل أي أحد
        </p>
        <a href="#form" className="bg-yellow-400 text-black font-black text-xl px-10 py-4 rounded-full hover:bg-yellow-300 transition">
          احصل على العرض الآن ⬇️
        </a>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { icon: "👗", title: "أحدث التصاميم", desc: "كل أسبوع وصول جديد من أشهر الماركات" },
          { icon: "💰", title: "أسعار لا تقاوم", desc: "خصومات حصرية للمشتركين في القائمة" },
          { icon: "🚚", title: "توصيل سريع", desc: "توصيل لباب بيتك في أقل من 48 ساعة" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-800 rounded-2xl p-6">
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      <section id="form" className="max-w-lg mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-center mb-2">سجّل بياناتك الآن</h2>
          <p className="text-gray-400 text-center mb-6">واحصل على خصم 10% على أول طلب</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="الاسم الكامل *"
              required
              className="w-full bg-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="رقم الهاتف *"
              required
              className="w-full bg-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full bg-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              placeholder="ما هي تفضيلاتك؟ (اختياري)"
              rows={3}
              className="w-full bg-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {error && <p className="text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-black text-xl py-4 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "جاري الإرسال..." : "احصل على العرض الآن 🎁"}
            </button>
          </form>
        </div>
      </section>

      <footer className="text-center text-gray-500 py-8">
        <p>© 2024 متجر الأناقة - جميع الحقوق محفوظة</p>
      </footer>
    </main>
  );
}
