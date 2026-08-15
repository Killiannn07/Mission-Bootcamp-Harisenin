import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";
import MovieLogo from "../assets/logo/movie-open.svg";
import Chill from "../assets/logo/CHILL.svg";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Token reset tidak ditemukan.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage(res.data.message || "Kata sandi berhasil direset.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mereset kata sandi.");
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

        <h1 className="font-bold text-lg md:text-3xl mb-2">Reset Kata Sandi</h1>
        <p className="font-normal text-10 md:text-lg text-gray-400 mb-6">
          Masukkan kata sandi baru Anda
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Field */}
          <div>
            <p className="font-medium text-left mb-2 text-10 md:text-lg">Kata Sandi Baru</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-text-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <p className="font-medium text-left mb-2 text-10 md:text-lg">Konfirmasi Kata Sandi</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Konfirmasi kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-text-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
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
            {loading ? "Mereset..." : "Reset Kata Sandi"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-10 md:text-[16px] text-gray-400">
            <a href="/login" className="text-text-primary hover:underline">
              Kembali ke Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
