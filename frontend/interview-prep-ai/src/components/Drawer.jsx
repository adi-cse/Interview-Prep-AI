import React from 'react';
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .drw-wrap {
          position: fixed;
          top: 64px; right: 0; z-index: 40;
          height: calc(100vh - 64px);
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-left: 1.5px solid #FFE0C8;
          box-shadow: -8px 0 40px rgba(255,147,36,0.10), -2px 0 12px rgba(0,0,0,0.06);
          display: flex; flex-direction: column;
          overflow: hidden;
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
          font-family: 'DM Sans', sans-serif;
        }
        .drw-open  { transform: translateX(0); }
        .drw-close { transform: translateX(100%); }

        /* Header */
        .drw-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 16px;
          background: #FFFCEF;
          border-bottom: 1px solid #FFE8D6;
          flex-shrink: 0;
        }

        /* Orange accent bar at top */
        .drw-header::before {
          content: '';
          position: absolute;
          top: 64px; right: 0;
          width: 100%; max-width: 420px;
          height: 3px;
          background: linear-gradient(90deg, #FF9324, #FFD4A8);
        }

        .drw-title {
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700; color: #111;
          margin: 0;
        }

        /* Close btn */
        .drw-close-btn {
          width: 32px; height: 32px; border-radius: 10px;
          background: #FFF0E4; border: 1px solid #FFCBA4;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #c96a0a;
          transition: background 0.18s, transform 0.15s;
          flex-shrink: 0;
        }
        .drw-close-btn:hover {
          background: #FFE0C8;
          transform: scale(1.08);
        }

        /* Body */
        .drw-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px 32px;
        }
        .drw-body::-webkit-scrollbar { width: 5px; }
        .drw-body::-webkit-scrollbar-track { background: #FFFCEF; }
        .drw-body::-webkit-scrollbar-thumb { background: #FFCBA4; border-radius: 99px; }

        /* Responsive */
        @media (max-width: 480px) {
          .drw-wrap { max-width: 100%; }
        }
      `}</style>

      <div
        className={`drw-wrap ${isOpen ? 'drw-open' : 'drw-close'}`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="drw-header">
          <h5 id="drawer-right-label" className="drw-title">{title}</h5>
          <button type="button" className="drw-close-btn" onClick={onClose} aria-label="Close drawer">
            <LuX size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="drw-body">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;