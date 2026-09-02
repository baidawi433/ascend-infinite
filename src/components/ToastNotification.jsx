// ToastNotification.jsx
// Menampilkan daftar notifikasi kecil yang muncul lalu hilang otomatis

import { useEffect } from "react";

const MAX_VISIBLE_TOASTS = 2; // maksimal 2 toast tampil sekaligus, sisanya diabaikan biar tidak menumpuk
const TOAST_DURATION_MS = 1400; // dipercepat dari 3000ms

function ToastNotification({ toasts, onRemove }) {
  const visibleToasts = toasts.slice(-MAX_VISIBLE_TOASTS);

  return (
    <div style={{
      position: "fixed", top: "16px", right: "16px",
      display: "flex", flexDirection: "column", gap: "8px",
      zIndex: 2000, maxWidth: "260px"
    }}>
      {visibleToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timeout = setTimeout(() => onRemove(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [toast.id, onRemove]);

  const colors = {
    levelup: "#3498db",
    loot: "#f1c40f",
    achievement: "#9b59b6",
    boss: "#e74c3c",
  };

  return (
    <div
      style={{
        padding: "8px 12px",
        background: "#141420",
        border: `1px solid ${colors[toast.type] || "#8e44ad"}`,
        borderLeft: `4px solid ${colors[toast.type] || "#8e44ad"}`,
        borderRadius: "8px",
        color: "white",
        fontSize: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        animation: "slideIn 0.2s ease-out",
      }}
    >
      <strong style={{ fontSize: "12px" }}>{toast.title}</strong>
      {toast.subtitle && <p style={{ margin: "1px 0 0 0", color: "#aaa", fontSize: "11px" }}>{toast.subtitle}</p>}
    </div>
  );
}

export default ToastNotification;