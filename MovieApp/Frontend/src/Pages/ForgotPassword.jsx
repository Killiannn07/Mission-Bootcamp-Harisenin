import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import MovieLogo from "../assets/logo/movie-open.svg";
import Chill from "../assets/logo/CHILL.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email harus diisi");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(
        res.data.message || "Jika email terdaftar, link reset akan dikirim ke email Anda.",
      );
      setEmail("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Gagal mengirim email reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4" style={{ backgroundImage: "url('/background-login.jpg')" }}>
      <div className="bg-background opacity-84 flex flex-col rounded-lg w-lg p-5 mx-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center items-center mb-5 md:mb-10 gap-1">
          <img src={MovieLogo} alt="Logo" className="w-7 h-6 md:h-12 md:w-14" />
          <img src={Chill} alt="Logo" className="h-6 md:h-10" />
        </div>

        <h1 className="font-bold text-lg md:text-3xl mb-2">Lupa Kata Sandi</h1>
        <p className="font-normal text-10 md:text-lg text-gray-400 mb-6">
          Masukkan email Anda untuk menerima link reset kata sandi
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="font-medium text-left mb-2 text-10 md:text-lg">Email</p>
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-text-primary"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 border border-bdr rounded-3xl bg-btn-secondary cursor-pointer hover:bg-opacity-80 transition font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-10 md:text-[16px] text-gray-400">
            Ingat kata sandi Anda?{" "}
            <a href="/login" className="text-text-primary hover:underline">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
