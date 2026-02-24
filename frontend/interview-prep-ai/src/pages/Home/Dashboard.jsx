import React, { useState, useEffect } from "react";
import {
  LuPlus, LuBrain, LuRocket, LuChartBar,
  LuSparkles, LuLayers, LuClock, LuTrendingUp,
  LuBookOpen, LuTarget, LuZap
} from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "../Home/CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data?.sessions || []);
    } catch {
      toast.error("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch {
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => { fetchAllSessions(); }, []);

  const totalQuestions = sessions.reduce((acc, s) => acc + (s.questions?.length || 0), 0);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        /* ── Base ── */
        .db-wrap {
          background: #FFFCEF;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }
        .db-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }
        .db-fd { font-family: 'Sora', sans-serif !important; }

        /* ── Fade in animation ── */
        @keyframes db-fade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .db-fade {
          animation: db-fade 0.5s ease forwards;
        }
        .db-fade-1 { animation: db-fade 0.5s ease 0.05s both; }
        .db-fade-2 { animation: db-fade 0.5s ease 0.15s both; }
        .db-fade-3 { animation: db-fade 0.5s ease 0.25s both; }
        .db-fade-4 { animation: db-fade 0.5s ease 0.35s both; }

        /* ── Pill badge ── */
        .db-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #FFF0E4; color: #c96a0a;
          font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 100px;
          border: 1px solid #FFCBA4; letter-spacing: 0.05em;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Buttons ── */
        .db-btn-black {
          display: inline-flex; align-items: center; gap: 8px;
          background: #111; color: #fff;
          font-size: 13px; font-weight: 700;
          padding: 11px 22px; border-radius: 100px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          white-space: nowrap; transition: background 0.18s, transform 0.15s;
        }
        .db-btn-black:hover { background: #333; transform: translateY(-1px); }

        .db-btn-black-lg {
          display: inline-flex; align-items: center; gap: 8px;
          background: #111; color: #fff;
          font-size: 15px; font-weight: 700;
          padding: 14px 32px; border-radius: 100px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          margin-top: 28px; transition: background 0.18s, transform 0.15s;
        }
        .db-btn-black-lg:hover { background: #333; transform: translateY(-1px); }

        /* ── Stat cards ── */
        .db-stat-card {
          background: #fff; border: 1px solid #FFE0C8;
          border-radius: 20px; padding: 24px;
          box-shadow: 0 2px 16px rgba(255,147,36,0.07);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .db-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(255,147,36,0.13);
        }
        .db-stat-icon {
          width: 44px; height: 44px; border-radius: 14px;
          background: #FFF0E4; color: #FF9324;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }

        /* ── Session card wrapper ── */
        .db-session-card {
          background: #fff; border: 1px solid #FFE0C8;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 2px 16px rgba(255,147,36,0.07);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .db-session-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(255,147,36,0.14);
        }

        /* ── Benefit card ── */
        .db-benefit-card {
          background: #fff; border: 1px solid #FFE0C8;
          border-radius: 20px; padding: 32px 24px; text-align: center;
          box-shadow: 0 2px 16px rgba(255,147,36,0.06);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .db-benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 48px rgba(255,147,36,0.12);
        }
        .db-benefit-icon {
          width: 50px; height: 50px; border-radius: 16px;
          background: #FFF0E4; color: #FF9324;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }

        /* ── Skeleton loader ── */
        .db-skel {
          border-radius: 16px;
          background: linear-gradient(90deg, #fff5eb 25%, #ffe8d0 50%, #fff5eb 75%);
          background-size: 200% 100%;
          animation: db-shimmer 1.4s infinite;
        }
        @keyframes db-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Divider ── */
        .db-hr { height: 1px; background: #FFE8D6; margin: 36px 0; }

        /* ── Header row ── */
        .db-hdr {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap; gap: 16px; margin-bottom: 28px;
        }

        /* ── Grids ── */
        .db-g3     { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .db-g3stat { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 32px; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .db-g3     { grid-template-columns: repeat(2,1fr); }
          .db-g3stat { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 560px) {
          .db-g3     { grid-template-columns: 1fr; }
          .db-g3stat { grid-template-columns: repeat(2,1fr); }
          .db-inner  { padding: 20px 16px 60px; }
        }
        @media (max-width: 360px) {
          .db-g3stat { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="db-wrap">
        <div className="db-inner">

          {/* ══ LOADING ══ */}
          {loading && (
            <div>
              <div className="db-g3stat">
                {[1,2,3].map(i => <div key={i} className="db-skel" style={{ height: 110 }} />)}
              </div>
              <div className="db-g3">
                {[1,2,3].map(i => <div key={i} className="db-skel" style={{ height: 210 }} />)}
              </div>
            </div>
          )}

          {/* ══ EMPTY STATE ══ */}
          {!loading && sessions.length === 0 && (
            <div>
              {/* Hero */}
              <div className="db-fade-1" style={{ textAlign: "center", padding: "52px 20px 16px" }}>
                <div style={{ width: 68, height: 68, borderRadius: 22, background: "linear-gradient(135deg,#FF9324,#FF6B00)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 12px 32px rgba(255,147,36,0.30)" }}>
                  <LuRocket size={30} color="#fff" />
                </div>

                <span className="db-pill"><LuSparkles size={11} /> Get Started</span>

                <h1 className="db-fd" style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111", lineHeight: 1.15, margin: "14px 0 12px" }}>
                  Ace Interviews with Confidence 🚀
                </h1>
                <p style={{ fontSize: 15, color: "#888", maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
                  Create smart interview prep sessions, practice role-specific questions,
                  and track your growth — all in one place.
                </p>

                <button className="db-btn-black-lg" onClick={() => setOpenCreateModal(true)}>
                  <LuPlus size={16} /> Create Your First Session
                </button>
              </div>

              <div className="db-hr" />

              {/* Why PrepAI */}
              <div className="db-fade-2" style={{ textAlign: "center", marginBottom: 28 }}>
                <span className="db-pill"><LuSparkles size={11} /> Why PrepAI</span>
                <h2 className="db-fd" style={{ fontSize: 22, fontWeight: 700, color: "#111", marginTop: 12 }}>
                  Everything you need to succeed
                </h2>
              </div>

              <div className="db-g3 db-fade-3">
                {[
                  { icon: <LuBrain size={22} />, title: "Smart Practice", desc: "Structured sessions tailored exactly to your role and experience level." },
                  { icon: <LuChartBar size={22} />, title: "Track Progress", desc: "See total questions practiced and monitor your improvement over time." },
                  { icon: <LuZap size={22} />, title: "Boost Confidence", desc: "Consistent practice builds the real confidence you need on interview day." },
                ].map((item, i) => (
                  <div key={i} className="db-benefit-card">
                    <div className="db-benefit-icon">{item.icon}</div>
                    <h3 className="db-fd" style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "#999", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SESSIONS VIEW ══ */}
          {!loading && sessions.length > 0 && (
            <div>
              {/* Header */}
              <div className="db-hdr db-fade-1">
                <div>
                  <span className="db-pill"><LuLayers size={11} /> Dashboard</span>
                  <h2 className="db-fd" style={{ fontSize: 26, fontWeight: 700, color: "#111", marginTop: 10, marginBottom: 3 }}>
                    Your Interview Sessions
                  </h2>
                  <p style={{ fontSize: 13, color: "#bbb" }}>Pick up where you left off</p>
                </div>
                <button className="db-btn-black" onClick={() => setOpenCreateModal(true)}>
                  <LuPlus size={15} /> New Session
                </button>
              </div>

              {/* Stat cards */}
              <div className="db-g3stat db-fade-2">
                {[
                  { icon: <LuBookOpen size={20} />, value: sessions.length, label: "Total Sessions" },
                  { icon: <LuTarget size={20} />, value: totalQuestions, label: "Questions Practiced" },
                  {
                    icon: <LuClock size={20} />,
                    value: sessions[0]?.updatedAt ? moment(sessions[0].updatedAt).format("D MMM") : "—",
                    label: "Last Activity",
                    sm: true
                  },
                ].map((s, i) => (
                  <div key={i} className="db-stat-card">
                    <div className="db-stat-icon">{s.icon}</div>
                    <div className="db-fd" style={{ fontSize: s.sm ? 22 : 32, fontWeight: 800, color: "#111", lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: 13, color: "#999", marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Label row */}
              <div className="db-fade-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                <div>
                  <h3 className="db-fd" style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Recent Sessions</h3>
                  <p style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}>{sessions.length} session{sessions.length !== 1 ? "s" : ""}</p>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#FF9324", fontWeight: 600 }}>
                  <LuTrendingUp size={13} /> Keep going!
                </span>
              </div>

              {/* Cards */}
              <div className="db-g3 db-fade-4">
                {sessions.map((data, index) => (
                  <div key={data?._id} className="db-session-card">
                    <SummaryCard
                      colors={CARD_BG[index % CARD_BG.length]}
                      role={data?.role || ""}
                      topicsToFocus={data?.topicsToFocusOn || ""}
                      experience={data?.experienceLevel || "-"}
                      questions={data?.questions?.length || "-"}
                      description={data?.description || ""}
                      lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
                      onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                      onDelete={() => setOpenDeleteAlert({ open: true, data })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── MODALS ── */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm onSuccess={() => { setOpenCreateModal(false); fetchAllSessions(); }} />
      </Modal>

      <Modal isOpen={openDeleteAlert.open} onClose={() => setOpenDeleteAlert({ open: false, data: null })}>
        <div className="w-[30vw]">
          <DeleteAlertContent
            data={openDeleteAlert.data}
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;