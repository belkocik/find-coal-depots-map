import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="fixed bottom-2 right-2 z-20">
      <button
        type="button"
        className={
          visible
            ? "bg-nav hover:bg-navHover focus:ring-nav inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            : "hidden"
        }
      >
        <FaArrowCircleUp onClick={scrollToTop} />
      </button>
    </div>
  );
};

export default ScrollToTop;
