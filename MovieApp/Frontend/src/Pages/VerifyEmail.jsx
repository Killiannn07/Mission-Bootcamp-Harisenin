import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MdCheckCircle, MdError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "../Services/api";
import MovieLogo from "../assets/logo/movie-open.svg";
import Chill from "../assets/logo/CHILL.svg";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Token verifikasi tidak ditemukan.");
        return;
      }

      try {
        const res = await api.get(`/auth/verify-email?token=${token}`);

        setStatus("success");
        setMessage(res.data.message || "Email berhasil diverifikasi.");
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "Verifikasi email gagal.",
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4" style={{ backgroundImage: "url('/background-login.jpg')" }}>
      <div className="bg-background opacity-84 flex flex-col rounded-lg w-lg p-5 mx-6 md:p-10 text-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-5 md:mb-10 gap-1">
          <img src={MovieLogo} alt="Logo" className="w-7 h-6 md:h-12 md:w-14" />
          <img src={Chill} alt="Logo" className="h-6 md:h-10" />
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-5xl text-text-primary mx-auto mb-4" />
            <h1 className="font-bold text-lg md:text-3xl mb-2">Memverifikasi Email</h1>
            <p className="text-10 md:text-lg text-gray-400">Mohon tunggu sebentar...</p>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <MdCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
            <h1 className="font-bold text-lg md:text-3xl mb-2 text-green-400">Email Berhasil Diverifikasi</h1>
            <p className="text-10 md:text-lg text-gray-300 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-12 border border-bdr rounded-3xl bg-btn-secondary cursor-pointer hover:bg-opacity-80 transition font-bold text-white"
            >
              Ke Halaman Masuk
            </button>
          </>
        )}

        {/* Error State */}
        {status === "error" && (
          <>
            <MdError className="text-5xl text-red-500 mx-auto mb-4" />
            <h1 className="font-bold text-lg md:text-3xl mb-2 text-red-400">Verifikasi Email Gagal</h1>
            <p className="text-10 md:text-lg text-gray-300 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full h-12 border border-bdr rounded-3xl bg-btn-secondary cursor-pointer hover:bg-opacity-80 transition font-bold text-white"
              >
                Kembali ke Masuk
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full h-12 border border-text-primary rounded-3xl bg-transparent cursor-pointer hover:bg-text-primary/10 transition font-bold text-text-primary"
              >
                Daftar Ulang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
