import React, { useState } from "react";
import MovieLogo from "../../assets/logo/movie-open.svg";
import {useNavigate} from 'react-router-dom'
import Chill from "../../assets/logo/CHILL.svg";
import { GoogleButton } from "../ui/GoogleButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const AuthForm = ({ type }) => {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  
  const handleSubmit = () => {
    if (isLogin) {
      navigate("/")
    } else{
      navigate("/login")
    }
  }

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
        <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-10">
          Username
        </p>
        <input
          className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border "
          label="Username"
          type="text"
          placeholder="Masukkan Username"
        />
      </div>
      <div>
        <p className="font-medium text-left mb-1 text-10 md:text-lg mt-5 md:mt-8">
          Kata sandi
        </p>
        <div className="relative">
          <input
            className="w-full border border-bdr rounded-3xl px-3 py-1 md:p-3 box-border"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
      </div>

      {isLogin ? (
        <div className="mb-5 md:mb-10 mt-1 flex justify-between">
          <p className="text-10 md:text-[16px] text-left text-gray-400">
            Belum punya akun?{" "}
            <a href="/register" className="text-text-primary hover:underline">
              Daftar
            </a>
          </p>
          <a href="#" className="text-10 md:text-[16px] hover:underline">
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
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
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
        <button
          className="w-full h-12 border border-bdr rounded-3xl bg-btn-secondary cursor-pointer"
          onClick={handleSubmit}
        >
          {isLogin ? "Masuk" : "Daftar"}
        </button>
        <p>Atau</p>
        {isLogin ? (
          <GoogleButton text="Masuk dengan Google" />
        ) : (
          <GoogleButton text="Daftar degan Google" />
        )}
      </div>
    </div>
  );
};
