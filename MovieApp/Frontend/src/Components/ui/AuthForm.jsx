import React, { useState } from "react";
import MovieLogo from "../../assets/logo/movie-open.svg";
import { useNavigate } from "react-router-dom";
import Chill from "../../assets/logo/CHILL.svg";
import { GoogleButton } from "./GoogleButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "./Button";
import { loginUser, registerUser } from "../../Services/authService";

export const AuthForm = ({ type }) => {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Email dan password harus diisi");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Format email tidak valid");
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Semua field harus diisi");
        return false;
      }
      if (formData.name.length < 2) {
        setError("Nama minimal 2 karakter");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Format email tidak valid");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password minimal 6 karakter");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Password tidak cocok");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await loginUser(formData.email, formData.password);
        navigate("/");
      } else {
        await registerUser(formData.name, formData.email, formData.password);
        setError("");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/verify-email");
      }
    } catch (err) {
      const errorMessage = err.message || err.data?.message || "Terjadi kesalahan";
      setError(errorMessage);
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background opacity-84 flex flex-col rounded-lg w-lg p-5 mx-6 md:p-10 ">
      <div className="flex justify-center items-center mb-5 md:mb-10 gap-1">
        <img src={MovieLogo} alt="Logo" className="w-7 h-6 md:h-12 md:w-14" />
        <img src={Chill} alt="Logo" className="h-6 md:h-10" />
      </div>
      <h1 className="font-bold text-lg md:text-3xl">
        {isLogin ? "Masuk" : "Daftar"}
      </h1>
      <h2 className="font-normal text-10  md:text-lg">
        {isLogin ? "Selamat datang kembali!" : "Selamat Datang!"}
      </h2>

      <div>
        {!isLogin && (
          <div>
            <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-10">
              Nama
            </p>
            <input
              className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border"
              name="name"
              type="text"
              placeholder="Masukkan Nama"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        )}
        <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-10">
          Email
        </p>
        <input
          className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border"
          name="email"
          type="email"
          placeholder="Masukkan Email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
        />
      </div>
      <div>
        <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-8">
          Kata sandi
        </p>
        <div className="relative">
          <input
            className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            type="button"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 my-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {isLogin ? (
        <div className="mb-5 md:mb-10 mt-1 flex justify-between">
          <p className="text-10 md:text-[16px] text-left text-gray-400">
            Belum punya akun?{" "}
            <a href="/register" className="text-text-primary hover:underline">
              Daftar
            </a>
          </p>
          <a href="/forgot-password" className="text-10 md:text-[16px] hover:underline">
            Lupa kata sandi?
          </a>
        </div>
      ) : (
        <div className="mb-5 md:mb-10">
          <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-8">
            Konfirmasi kata sandi
          </p>
          <div className="relative">
            <input
              className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Konfirmasi kata sandi"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <p className="text-10 md:text-[16px] text-left text-gray-400">
            Sudah punya akun?{" "}
            <a href="/login" className="text-text-primary hover:underline">
              Masuk
            </a>
          </p>
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit}>
          <Button variant="auth" type="submit" disabled={loading}>
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
          </Button>
        </form>
        <p className="text-10 md:text-lg text-text-secondary my-1 md:my-2">
          Atau
        </p>
        {isLogin ? (
          <GoogleButton text="Masuk dengan Google" />
        ) : (
          <GoogleButton text="Daftar dengan Google" />
        )}
      </div>
    </div>
  );
};
