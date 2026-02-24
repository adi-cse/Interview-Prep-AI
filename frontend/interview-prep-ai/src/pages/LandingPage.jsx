import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hpic.png";
import { APP_FEATURES } from "../utils/data";
import { LuSparkles, LuArrowRight, LuStar, LuCircleCheck, LuBrain, LuZap, LuTrendingUp } from "react-icons/lu";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { UserContext } from "../Context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick Your Role",
    desc: "Choose from dozens of tech and non-tech roles. Our AI tailors questions to your exact target position.",
    icon: <LuBrain size={22} />,
  },
  {
    step: "02",
    title: "Practice with AI",
    desc: "Answer real interview questions. Get instant AI-generated model answers and detailed explanations.",
    icon: <LuZap size={22} />,
  },
  {
    step: "03",
    title: "Track & Improve",
    desc: "Bookmark tough questions, review your sessions, and watch your confidence grow over time.",
    icon: <LuTrendingUp size={22} />,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "SDE-2 @ Amazon",
    avatar: "PS",
    text: "I cracked my Amazon interview after 3 weeks of practice here. The AI-generated answers were spot-on and saved me hours of Googling.",
    stars: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Product Manager @ Flipkart",
    avatar: "RM",
    text: "Finally a prep tool that actually understands PM interviews. The structured answers with STAR format were incredibly helpful.",
    stars: 5,
  },
  {
    name: "Sneha Iyer",
    role: "Data Analyst @ Swiggy",
    avatar: "SI",
    text: "From total beginner to confident interviewee in 4 weeks. The expand answer feature is a game changer for deep dives.",
    stars: 5,
  },
];

const STATS = [
  { value: "10K+", label: "Interviews Aced" },
  { value: "500+", label: "Questions Curated" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Roles Covered" },
];

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <LuStar key={i} size={13} style={{ fill: "#FF9324", color: "#FF9324" }} />
    ))}
  </div>
);

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, body { font-family: 'DM Sans', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        .fd { font-family: 'Sora', sans-serif; }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .afu { animation: fadeUp 0.6s ease forwards; }
        .d1  { animation-delay: 0.08s; opacity: 0; }
        .d2  { animation-delay: 0.20s; opacity: 0; }
        .d3  { animation-delay: 0.33s; opacity: 0; }
        .d4  { animation-delay: 0.46s; opacity: 0; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-9px); }
        }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes shine {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shine {
          background: linear-gradient(110deg, #FF9324 0%, #E8630A 45%, #FF9324 90%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine 3s ease infinite;
        }

        /* ── Reusable ── */
        .card {
          background: #fff;
          border: 1px solid #FFE0C8;
          border-radius: 18px;
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 48px rgba(255,147,36,0.09);
        }
        .ibox {
          width: 44px; height: 44px; border-radius: 13px;
          background: #FFF0E4; color: #FF9324;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #FFF0E4; color: #c96a0a;
          font-size: 12px; font-weight: 600;
          padding: 5px 14px; border-radius: 100px;
          border: 1px solid #FFCBA4;
        }
        .divbar {
          width: 34px; height: 3px; border-radius: 99px;
          background: #FF9324; margin: 0 auto 10px;
        }
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          background: #FF9324; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 13px 28px; border-radius: 100px; border: none;
          cursor: pointer; transition: background 0.18s, transform 0.15s;
        }
        .btn-p:hover { background: #e8831d; transform: translateY(-1px); }
        .btn-s {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #333;
          font-size: 14px; font-weight: 600;
          padding: 12px 26px; border-radius: 100px;
          border: 1.5px solid #FFCBA4; cursor: pointer; text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
        }
        .btn-s:hover { border-color: #FF9324; background: #FFF5EC; }
        .step-num {
          font-family: 'Sora', sans-serif;
          font-size: 52px; font-weight: 800;
          color: #FFDCC0; line-height: 1; margin-bottom: 4px;
        }

        /* ── NAV ── */
        .nav-wrap {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,252,239,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #FFE0C8;
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 20px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-links { display: flex; gap: 28px; }
        .navlink {
          font-size: 14px; font-weight: 500; color: #666;
          text-decoration: none; transition: color 0.18s;
        }
        .navlink:hover { color: #FF9324; }

        /* ── HERO ── */
        .hero-section { background: #FFFCEF; position: relative; overflow: hidden; }
        .hero-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 88px 20px 56px;
          position: relative; z-index: 1; text-align: center;
        }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 620px; margin: 0 auto;
          border-radius: 16px; overflow: hidden;
          border: 1px solid #FFE0C8; background: #fff;
          box-shadow: 0 2px 20px rgba(255,147,36,0.06);
        }
        .stat-cell {
          padding: 20px 12px; text-align: center;
          border-right: 1px solid #FFE0C8;
        }
        .stat-cell:last-child { border-right: none; }
        .hero-img-wrap {
          max-width: 980px; margin: 0 auto; padding: 0 20px;
        }

        /* ── SECTION WRAPPER ── */
        .sec { padding: 96px 20px; }
        .sec-inner { max-width: 1100px; margin: 0 auto; }
        .sec-head { text-align: center; margin-bottom: 52px; }

        /* ── GRIDS ── */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px; margin-bottom: 18px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .grid-3-step {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── FOOTER ── */
        .footer-inner {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 20px; padding-bottom: 24px;
          border-bottom: 1px solid #222;
        }
        .footer-links { display: flex; gap: 28px; }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: #FF9324; border-radius: 24px;
          padding: 64px 48px; text-align: center;
          position: relative; overflow: hidden;
          box-shadow: 0 24px 64px rgba(255,147,36,0.28);
        }

        /* ════════════════════════════════════════
           MOBILE BREAKPOINTS
        ════════════════════════════════════════ */

        /* Tablet: ≤ 768px */
        @media (max-width: 768px) {
          .nav-links { display: none; }

          .hero-inner { padding: 60px 20px 40px; }

          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell:nth-child(3) { border-right: 1px solid #FFE0C8; border-top: 1px solid #FFE0C8; }
          .stat-cell:nth-child(4) { border-right: none; border-top: 1px solid #FFE0C8; }

          .grid-3 { grid-template-columns: 1fr; }
          .grid-2 { grid-template-columns: 1fr; }
          .grid-3-step { grid-template-columns: 1fr; }

          .sec { padding: 64px 20px; }

          .cta-banner { padding: 48px 24px; }

          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .footer-links { flex-wrap: wrap; gap: 16px; }
        }

        /* Phone: ≤ 480px */
        @media (max-width: 480px) {
          .hero-inner { padding: 48px 16px 36px; }

          /* Hero btns: side by side, compact */
          .hero-btns { flex-direction: row; gap: 8px; flex-wrap: nowrap; }
          .hero-btns .btn-p { font-size: 12px; padding: 10px 16px; }
          .hero-btns .btn-s { font-size: 12px; padding: 9px 14px; }

          /* Section CTA btn */
          .sec-cta .btn-p { font-size: 13px; padding: 11px 22px; }

          /* Nav auth btn: small */
          .nav-auth-btn { font-size: 11px !important; padding: 7px 12px !important; }

          .stats-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
          .hero-img-wrap { padding: 0 12px; }
          .sec { padding: 52px 16px; }
          .cta-banner { padding: 40px 20px; border-radius: 18px; }
          .nav-inner { padding: 0 16px; }
        }

        /* Very small phones ≤ 360px: stack hero btns */
        @media (max-width: 360px) {
          .hero-btns { flex-direction: column; align-items: stretch; }
          .hero-btns .btn-p,
          .hero-btns .btn-s { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav-wrap">
        <div className="nav-inner">
          {/* Logo */}
          <div className="nav-logo">
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FF9324", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LuSparkles size={16} color="#fff" />
            </div>
            <span className="fd" style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>
              Interview <span style={{ color: "#FF9324" }}>Prep AI</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="nav-links">
            <a href="#features" className="navlink">Features</a>
            <a href="#how" className="navlink">How It Works</a>
            <a href="#reviews" className="navlink">Reviews</a>
          </div>

          {/* Auth */}
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button className="btn-p nav-auth-btn" style={{ fontSize: 13, padding: "9px 20px", whiteSpace: "nowrap" }} onClick={() => setOpenAuthModal(true)}>
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        {/* Blobs */}
        <div style={{ position: "absolute", top: -120, left: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,180,120,0.15)", filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: -60, width: 380, height: 380, borderRadius: "50%", background: "rgba(255,160,90,0.10)", filter: "blur(70px)", pointerEvents: "none" }} />

        <div className="hero-inner">
          <div className="afu d1">
            <span className="pill"><LuSparkles size={12} /> AI Powered</span>
          </div>

          <h1 className="afu d2 fd" style={{ fontSize: "clamp(32px, 5.5vw, 66px)", fontWeight: 800, color: "#111", lineHeight: 1.1, margin: "20px 0 18px" }}>
            Ace Interviews with<br />
            <span className="shine">AI-Powered</span> Learning
          </h1>

          <p className="afu d3" style={{ fontSize: 16, color: "#777", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.75 }}>
            Get role-specific questions, expand answers when you need them, dive deeper into concepts,
            and organize everything your way.
          </p>

          <div className="afu d4 hero-btns">
            <button className="btn-p" onClick={handleCTA}>
              Get Started Free <LuArrowRight size={15} />
            </button>
            <a href="#how" className="btn-s">See How It Works</a>
          </div>

          {/* Stats */}
          <div className="afu d4 stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-cell">
                <div className="fd" style={{ fontSize: 24, fontWeight: 700, color: "#FF9324" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="hero-img-wrap">
          <div className="float" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 28px 80px rgba(255,147,36,0.12), 0 0 0 1px #FFE0C8" }}>
            <img src={HERO_IMG} alt="App Preview" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="sec" style={{ background: "#fff" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="divbar" />
            <p style={{ fontSize: 11, fontWeight: 700, color: "#FF9324", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 10 }}>Features</p>
            <h2 className="fd" style={{ fontSize: 34, fontWeight: 700, color: "#111", marginBottom: 12 }}>Everything You Need to Shine</h2>
            <p style={{ color: "#999", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>Built for serious candidates who want results, not just practice.</p>
          </div>

          <div className="grid-3">
            {APP_FEATURES.slice(0, 3).map((f) => (
              <div key={f.id} className="card" style={{ padding: 28 }}>
                <div className="ibox" style={{ marginBottom: 18 }}><LuSparkles size={18} /></div>
                <h3 className="fd" style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#999", lineHeight: 1.65 }}>{f.description}</p>
              </div>
            ))}
          </div>

          <div className="grid-2">
            {APP_FEATURES.slice(3).map((f) => (
              <div key={f.id} className="card" style={{ padding: 28, display: "flex", gap: 18 }}>
                <div className="ibox"><LuCircleCheck size={18} /></div>
                <div>
                  <h3 className="fd" style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#999", lineHeight: 1.65 }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="sec" style={{ background: "#FFFCEF" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="divbar" />
            <p style={{ fontSize: 11, fontWeight: 700, color: "#FF9324", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 10 }}>Process</p>
            <h2 className="fd" style={{ fontSize: 34, fontWeight: 700, color: "#111", marginBottom: 12 }}>From Zero to Interview-Ready</h2>
            <p style={{ color: "#999", fontSize: 15, maxWidth: 380, margin: "0 auto" }}>Three simple steps. One powerful outcome.</p>
          </div>

          <div className="grid-3-step">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="card" style={{ padding: 32, textAlign: "center" }}>
                <div className="step-num">{step.step}</div>
                <div style={{ width: 50, height: 50, borderRadius: 15, background: "#FF9324", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", margin: "0 auto 20px", boxShadow: "0 8px 20px rgba(255,147,36,0.28)" }}>
                  {step.icon}
                </div>
                <h3 className="fd" style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#999", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="sec-cta" style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-p" onClick={handleCTA}>
              Start Practicing Now <LuArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="sec" style={{ background: "#fff" }}>
        <div className="sec-inner">
          <div className="sec-head">
            <div className="divbar" />
            <p style={{ fontSize: 11, fontWeight: 700, color: "#FF9324", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 10 }}>Reviews</p>
            <h2 className="fd" style={{ fontSize: 34, fontWeight: 700, color: "#111", marginBottom: 12 }}>Real People, Real Results</h2>
            <p style={{ color: "#999", fontSize: 15, maxWidth: 380, margin: "0 auto" }}>Join thousands who have already landed their dream jobs.</p>
          </div>

          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <StarRating count={t.stars} />
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.72, margin: "16px 0", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #FFE8D6" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#FF9324", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#bbb" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="sec" style={{ background: "#FFFCEF" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className="cta-banner">
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 20 }}>
                <LuSparkles size={12} /> No credit card required
              </span>
              <h2 className="fd" style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>
                Your Next Interview Starts Today
              </h2>
              <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 15, maxWidth: 420, margin: "0 auto 36px" }}>
                Stop winging it. Start winning it. Join 10,000+ candidates who prep smarter.
              </p>
              <button
                onClick={handleCTA}
                style={{ background: "#fff", color: "#FF9324", fontWeight: 700, fontSize: 14, padding: "13px 30px", borderRadius: 100, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Start Free — No Hassle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f0f0f", padding: "48px 20px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "#FF9324", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LuSparkles size={14} color="#fff" />
              </div>
              <span className="fd" style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>
                Interview <span style={{ color: "#FF9324" }}>Prep AI</span>
              </span>
            </div>
            <div className="footer-links">
              {[["#features","Features"],["#how","How It Works"],["#reviews","Reviews"]].map(([href, label]) => (
                <a key={label} href={href} style={{ fontSize: 13, color: "#777", textDecoration: "none", transition: "color 0.18s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FF9324"}
                  onMouseLeave={e => e.currentTarget.style.color = "#777"}>
                  {label}
                </a>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "#555" }}>Made with ❤️ by <span style={{ color: "#FF9324", fontWeight: 600 }}>Aditya</span></p>
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#444", marginTop: 22 }}>
            © {new Date().getFullYear()} Interview Prep AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login"); }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;