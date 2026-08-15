// ToastNotification.jsx
// Menampilkan daftar notifikasi kecil yang muncul lalu hilang otomatis

import { useEffect } from "react";

function ToastNotification({ toasts, onRemove }) {
  return (
    <div style={{
      position: "fixed", top: "16px", right: "16px",
      display: "flex", flexDirection: "column", gap: "8px",
      zIndex: 2000, maxWidth: "280px"
    }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timeout = setTimeout(() => onRemove(toast.id), 3000);
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
        padding: "10px 14px",
        background: "#141420",
        border: `1px solid ${colors[toast.type] || "#8e44ad"}`,
        borderLeft: `4px solid ${colors[toast.type] || "#8e44ad"}`,
        borderRadius: "8px",
        color: "white",
        fontSize: "13px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        animation: "slideIn 0.25s ease-out",
      }}
    >
      <strong>{toast.title}</strong>
      {toast.subtitle && <p style={{ margin: "2px 0 0 0", color: "#aaa", fontSize: "12px" }}>{toast.subtitle}</p>}
    </div>
  );
}

export default ToastNotification;