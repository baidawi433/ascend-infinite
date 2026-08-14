// FloatingDamageNumber.jsx
// Menampilkan angka damage yang muncul lalu melayang ke atas dan menghilang

import { useEffect, useState } from "react";

function FloatingDamageNumber({ id, damage, isCritical, onFinish }) {
  const [style, setStyle] = useState({
    opacity: 1,
    transform: "translateY(0px)",
  });

  useEffect(() => {
    // Setelah dimunculkan, langsung mulai animasi naik + fade out
    const raf = requestAnimationFrame(() => {
      setStyle({
        opacity: 0,
        transform: "translateY(-40px)",
      });
    });

    // Hapus elemen ini dari daftar setelah animasi selesai (700ms)
    const timeout = setTimeout(() => {
      onFinish(id);
    }, 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [id, onFinish]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${40 + Math.random() * 20}%`,
        top: "20px",
        fontSize: isCritical ? "24px" : "18px",
        fontWeight: "bold",
        color: isCritical ? "#f1c40f" : "#ffffff",
        textShadow: "0 0 4px rgba(0,0,0,0.8)",
        transition: "all 0.7s ease-out",
        pointerEvents: "none",
        ...style,
      }}
    >
      {isCritical ? "CRIT! " : ""}{damage}
    </div>
  );
}

export default FloatingDamageNumber;