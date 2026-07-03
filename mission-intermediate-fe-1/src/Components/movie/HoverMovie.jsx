import React from "react";
import { FaPlay, FaCheck } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import { IoChevronDown } from "react-icons/io5"

export const HoverMovie = ({
  title,
  image,
  ageRating,
  episodes,
  duration,
  genres,
}) => {
  return (
    <div
      className="
        absolute z-1000 left-1/2 -translate-x-1/2 -top-8
        w-100 rounded-xl overflow-hidden
        bg-neutral-900 border border-neutral-700
        shadow-2xl shadow-black/70
        pointer-events-auto
        animate-in fade-in zoom-in-95 duration-150
      "
    >
      {/* Thumbnail besar */}
      <div className="relative w-full aspect-video">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full bg-neutral-700" />
        )}
      </div>

      {/* Info section */}
      <div className="p-3 space-y-2.5">
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-neutral-200 transition">
            <FaPlay className="text-black w-3.5 h-3.5 ml-0.5" />
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-500 hover:border-neutral-300 transition">
            <FaCheck className="text-white w-3.5 h-3.5" />
          </button>
          <div className="flex-1" />
          <button className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-500 hover:border-neutral-300 transition">
            <IoChevronDown className="text-white w-4 h-4" />
          </button>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {ageRating && (
            <span className="border border-neutral-500 text-neutral-300 px-1.5 py-0.5 rounded-sm text-[10px]">
              {ageRating}
            </span>
          )}
          {episodes != null && (
            <span className="text-neutral-300">{episodes} Episode</span>
          )}
          {duration && <span className="text-neutral-300">{duration}</span>}
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {genres.map((genre, i) => (
              <React.Fragment key={genre}>
                <span className="text-neutral-400 text-[11px]">{genre}</span>
                {i < genres.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-neutral-500 inline-block" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
