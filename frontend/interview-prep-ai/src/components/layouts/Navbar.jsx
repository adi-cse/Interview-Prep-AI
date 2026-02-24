import React from 'react';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import { Link } from "react-router-dom";
import { LuSparkles } from 'react-icons/lu';

const Navbar = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .nb-wrap {
          height: 64px;
          background: rgba(255,252,239,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #FFE0C8;
          box-shadow: 0 1px 12px rgba(255,147,36,0.06);
          position: sticky; top: 0; z-index: 30;
          font-family: 'DM Sans', sans-serif;
        }

        .nb-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 100%;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .nb-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .nb-logo-icon {
          width: 34px; height: 34px; border-radius: 11px;
          background: #FF9324;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(255,147,36,0.30);
          flex-shrink: 0;
          transition: transform 0.18s;
        }
        .nb-logo:hover .nb-logo-icon { transform: scale(1.08); }

        .nb-logo-text {
          font-family: 'Sora', sans-serif;
          font-size: 17px; font-weight: 700;
          color: #111; letter-spacing: -0.01em;
          line-height: 1;
        }
        .nb-logo-text span { color: #FF9324; }

        /* Right side */
        .nb-right {
          display: flex; align-items: center; gap: 12px;
        }

        /* Subtle ping dot — "live" indicator */
        .nb-live {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600; color: #bbb;
        }
        .nb-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ADE80;
          box-shadow: 0 0 0 2px rgba(74,222,128,0.2);
          animation: nb-ping 2s ease-in-out infinite;
        }
        @keyframes nb-ping {
          0%,100% { box-shadow: 0 0 0 2px rgba(74,222,128,0.2); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0.08); }
        }

        @media (max-width: 480px) {
          .nb-inner { padding: 0 16px; }
          .nb-logo-text { font-size: 15px; }
          .nb-live { display: none; }
        }
      `}</style>

      <nav className="nb-wrap">
        <div className="nb-inner">

          {/* Logo */}
          <Link to="/dashboard" className="nb-logo">
            <div className="nb-logo-icon">
              <LuSparkles size={17} color="#fff" />
            </div>
            <span className="nb-logo-text">
              Interview <span>Prep AI</span>
            </span>
          </Link>

          {/* Right */}
          <div className="nb-right">
            <div className="nb-live">
              <div className="nb-live-dot" />
              <span className="hidden md:inline">AI Ready</span>
            </div>
            <ProfileInfoCard />
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;