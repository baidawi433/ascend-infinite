// AnimatedNumber.jsx
// Menampilkan angka yang menghitung naik/turun secara halus dari nilai lama ke nilai baru

import { useState, useEffect, useRef } from "react";
import { formatNumber } from "../game/numberFormat";

function AnimatedNumber({ value, duration = 500 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;

    // Kalau selisihnya kecil banget atau ini render pertama, langsung set tanpa animasi
    if (startValue === endValue) return;

    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutQuad supaya count-up melambat di akhir, terasa natural
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = startValue + (endValue - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = endValue;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  return <>{formatNumber(Math.floor(displayValue))}</>;
}

export default AnimatedNumber;