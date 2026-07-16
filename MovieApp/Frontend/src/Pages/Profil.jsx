import React from "react";
import { MainLayout } from "../Components/layout/MainLayout";
import avatar from "/avatar.png";
import Button from "../Components/ui/Button";
import { MdOutlineUploadFile } from "react-icons/md";
import { FieldRow } from "../Utils/FieldRow";
import {
  MovieCardLandscape,
  MovieCardPotrait,
} from "../Components/movie/MovieCard";
import { movies } from "../data/movie";

export const ProfilPage = () => {
  return (
    <MainLayout>
      <div className=" py-1.5 px-5 md:py-6 md:px-20">
        <h2 className=" text-3xl text-left font-bold mb-8">Profil Saya</h2>

        <div className="flex flex-col-reverse md:flex-row gap-6 items-start justify-between">
          {/* Kolom kiri: Form Profil */}
          <div className=" w-full md:max-w-[50%] md:flex-1 space-y-8">
            <div className="flex items-center gap-6">
              <img
                src="/avatar.png"
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <button className="border border-blue-500 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-blue-500/10 transition">
                  Ubah Foto
                </button>
                <span className="flex items-center gap-1 text-neutral-400 text-xs">
                  <MdOutlineUploadFile className="w-3.5 h-3.5" />
                  Maksimal 2MB
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <FieldRow label="Nama Pengguna" initialValue="William" editable />
              <FieldRow label="Email" initialValue="william1980@gmail.com" />
              <FieldRow
                label="Kata Sandi"
                initialValue="william123"
                editable
                type="password"
              />
            </div>

            <button className="justify-start flex w-auto bg-btn-primary px-6 py-2.5 rounded-4xl hover:bg-btn-primary-hover transition">
              Simpan
            </button>
          </div>

          <div className=" md:w-80 lg:w-130 flex flex-col bg-btn-secondary-hover rounded-xl p-5">
            <div className="flex flex-row gap-5">
              <img src="/premium.png" alt="premium" className="w-20 h-20" />
              <div>
                <h3 className="font-bold lg:text-2xl mt-2 hidden text-left md:flex">
                  Saat ini anda belum berlangganan
                </h3>
                <h3 className="md:hidden text-left">Berlangganan</h3>
                <p className="text-neutral-400 text-sm mt-1.5 text-left">
                  Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan
                  Kamu!
                </p>
              </div>
            </div>

            <button className="bg-[#2F3334] text-sm font-medium px-4 py-2 rounded-4xl mt-4 hover:bg-btn-secondary transition">
              Mulai Berlangganan
            </button>
          </div>
        </div>
      </div>
      <div className="py-1.5 px-5 md:py-6 md:px-20">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-3xl font-semibold mb-4">Daftar Saya</h2>
          <a href="/daftarfilm" className="text-lg hover:underline hidden md:flex">Lihat Semua</a>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {movies.slice(0, 6).map((movieItem) => (
            <MovieCardPotrait key={movieItem.id} {...movieItem} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
