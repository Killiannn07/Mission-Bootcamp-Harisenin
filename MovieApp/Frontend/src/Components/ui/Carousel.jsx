import { useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Carousel = ({ items = [], renderCard, scrollAmount = 220 }) => {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({
      left: dir * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Prev */}
      <FaArrowLeft
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20
          rounded-full bg-background border border-neutral-600
          flex p-2"
        size={40}
      >
        
      </FaArrowLeft>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto overflow-y-visible scroll-smooth gap-3 px-1 py-8 pb-14 scrollbar-none"
      >
        {items.map((item) => renderCard(item))}
      </div>

      {/* Next */}
      <FaArrowRight
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
          rounded-full bg-background border border-neutral-600
          flex p-2"
          size={40}
      >
        
      </FaArrowRight>
    </div>
  );
};

export default Carousel;
