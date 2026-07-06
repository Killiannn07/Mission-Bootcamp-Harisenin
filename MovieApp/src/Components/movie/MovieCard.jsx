import React, { useState } from "react";


export const MovieCardPotrait = ({
  title,
  badge,
  topTen,
  image,
  genres = [],
  episodes,
  duration,
  ageRating,
}) => {
  return (
    <div className="group relative isolate w-full cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:z-50">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-neutral-800 shadow-sm">
        {image ? (
          <img
            src={image}
            alt={title}
            draggable="false"
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-700" />
        )}

        {badge && (
          <span className="absolute left-2 top-2 rounded-sm bg-btn-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            New Episode
          </span>
        )}

        {topTen && (
          <div className="absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-red-600 px-1.5 py-1 text-center leading-none text-white">
            <p className="text-[8px] font-black">Top</p>
            <p className="text-[8px] font-black">10</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const MovieCardLandscape = ({
  title,
  badge,
  topTen,
  image,
  genres = [],
  episodes,
  duration,
  ageRating,
  rating,
}) => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-800">
      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={title}
          draggable="false"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-neutral-700" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      {badge && (
        <span className="absolute left-2 top-2 rounded-sm bg-btn-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
          {badge}
        </span>
      )}

      {topTen && (
        <div className="absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-red-600 px-1.5 py-1 text-center leading-none text-white">
          <p className="text-[8px] font-black">Top</p>
          <p className="text-[8px] font-black">10</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex items-end justify-between gap-2">
        <h4 className="truncate text-xs font-medium text-white">{title}</h4>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-yellow-400 text-[10px]">★</span>
          <span className="text-[10px] text-neutral-200">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};
