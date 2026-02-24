import React from 'react';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        /* ── Backdrop ── */
        .mdl-backdrop {
          position: fixed; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: mdl-bg-in 0.2s ease forwards;
        }
        @keyframes mdl-bg-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Panel ── */
        .mdl-panel {
          position: relative;
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #FFE0C8;
          box-shadow:
            0 24px 64px rgba(0,0,0,0.14),
            0 4px 24px rgba(255,147,36,0.10);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: calc(100vh - 48px);
          animation: mdl-panel-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes mdl-panel-in {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* ── Header ── */
        .mdl-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px 16px;
          border-bottom: 1px solid #FFE8D6;
          background: #FFFCEF;
        }
        .mdl-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px; font-weight: 700; color: #111;
          margin: 0;
        }

        /* ── Close button ── */
        .mdl-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 32px; height: 32px; border-radius: 10px;
          background: #FFF0E4; border: 1px solid #FFCBA4;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #c96a0a;
          transition: background 0.18s, transform 0.15s;
          line-height: 1;
        }
        .mdl-close:hover {
          background: #FFE0C8;
          transform: scale(1.08);
        }
        .mdl-close svg {
          width: 12px; height: 12px;
          stroke: currentColor;
        }

        /* ── Body ── */
        .mdl-body {
          flex: 1;
          overflow-y: auto;
        }
        .mdl-body::-webkit-scrollbar { width: 5px; }
        .mdl-body::-webkit-scrollbar-track { background: #FFFCEF; }
        .mdl-body::-webkit-scrollbar-thumb { background: #FFCBA4; border-radius: 99px; }
      `}</style>

      <div className="mdl-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="mdl-panel">

          {/* Header */}
          {!hideHeader && (
            <div className="mdl-header">
              <h3 className="mdl-title">{title}</h3>
            </div>
          )}

          {/* Close button */}
          <button className="mdl-close" onClick={onClose} type="button" aria-label="Close">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>

          {/* Content */}
          <div className="mdl-body">
            {children}
          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;