import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { LuCircleAlert, LuListCollapse, LuSparkles, LuBrain, LuMessageSquare } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../InterviewPrep/components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { id } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(id));
      if (response.data?.session) setSessionData(response.data.session);
    } catch {
      toast.error("Failed to fetch session details");
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (response.data) setExplanation(response.data);
    } catch {
      setError("Failed to generate explanation");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experienceLevel,
        topicsToFocus: Array.isArray(sessionData?.topicsToFocusOn)
          ? sessionData?.topicsToFocusOn.join(", ")
          : sessionData?.topicsToFocusOn,
        numberOfQuestions: 5,
      });
      const generatedQuestions = response.data?.data;
      await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId: id,
        questions: generatedQuestions,
      });
      toast.success("More questions added");
      fetchSessionDetailById();
    } catch {
      toast.error("Failed to add questions");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (id) fetchSessionDetailById();
  }, [id]);

  if (!sessionData) {
    return (
      <DashboardLayout>
        <style>{`
          .ip-loading {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            min-height: 60vh; gap: 16px;
          }
          .ip-loading-icon {
            width: 56px; height: 56px; border-radius: 18px;
            background: linear-gradient(135deg,#FF9324,#FF6B00);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 10px 28px rgba(255,147,36,0.28);
            animation: ip-pulse 1.8s ease-in-out infinite;
          }
          @keyframes ip-pulse {
            0%,100% { transform: scale(1); box-shadow: 0 10px 28px rgba(255,147,36,0.28); }
            50%      { transform: scale(1.08); box-shadow: 0 16px 40px rgba(255,147,36,0.40); }
          }
        `}</style>
        <div className="ip-loading">
          <div className="ip-loading-icon">
            <LuBrain size={26} color="#fff" />
          </div>
          <p style={{ fontSize: 14, color: "#bbb", fontFamily: "'DM Sans',sans-serif" }}>Loading session...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .ip-root { font-family: 'DM Sans', sans-serif; }
        .ip-fd   { font-family: 'Sora', sans-serif !important; }

        /* Page */
        .ip-page {
          background: #FFFCEF;
          min-height: 100%;
          width: 100%;
        }
        .ip-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 24px 80px;
        }

        /* Pill badge */
        .ip-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #FFF0E4; color: #c96a0a;
          font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 100px;
          border: 1px solid #FFCBA4; letter-spacing: 0.04em;
        }

        /* Section header */
        .ip-section-head {
          margin: 32px 0 20px;
        }

        /* Question card wrapper */
        .ip-q-card {
          background: #fff;
          border: 1px solid #FFE0C8;
          border-radius: 20px;
          padding: 0;
          overflow: hidden;
          margin-bottom: 16px;
          box-shadow: 0 2px 14px rgba(255,147,36,0.06);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .ip-q-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(255,147,36,0.12);
        }

        /* Question index badge */
        .ip-q-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 8px;
          background: #FFF0E4; color: #FF9324;
          font-size: 11px; font-weight: 700;
          flex-shrink: 0;
        }

        /* Load more btn */
        .ip-load-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #111; color: #fff;
          font-size: 13px; font-weight: 700;
          padding: 12px 28px; border-radius: 100px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.18s, transform 0.15s;
          box-shadow: 0 4px 18px rgba(0,0,0,0.12);
        }
        .ip-load-btn:hover:not(:disabled) { background: #333; transform: translateY(-1px); }
        .ip-load-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* AI Panel */
        .ip-ai-panel {
          background: #fff;
          border: 1.5px solid #FFE0C8;
          border-radius: 22px;
          box-shadow: 0 4px 28px rgba(255,147,36,0.09);
          overflow: hidden;
          position: sticky;
          top: 24px;
        }
        .ip-ai-header {
          padding: 20px 22px 16px;
          border-bottom: 1px solid #FFE8D6;
          display: flex; align-items: center; gap: 10px;
        }
        .ip-ai-icon {
          width: 36px; height: 36px; border-radius: 11px;
          background: linear-gradient(135deg,#FF9324,#FF6B00);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(255,147,36,0.28);
        }
        .ip-ai-body {
          padding: 20px 22px;
          min-height: 260px;
        }

        /* Empty AI state */
        .ip-ai-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 12px;
          min-height: 200px; text-align: center;
        }
        .ip-ai-empty-icon {
          width: 52px; height: 52px; border-radius: 16px;
          background: #FFF0E4; color: #FF9324;
          display: flex; align-items: center; justify-content: center;
        }

        /* Skeleton override */
        .ip-skel-wrap { padding: 4px 0; }

        /* Error */
        .ip-error {
          display: flex; align-items: flex-start; gap: 8px;
          background: #FFF8F0; border: 1px solid #FFCBA4;
          color: #c96a0a; font-size: 13px; font-weight: 500;
          padding: 10px 14px; border-radius: 12px;
        }

        /* Main grid */
        .ip-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
        }

        /* Fade in */
        @keyframes ip-fade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ip-fade-1 { animation: ip-fade 0.45s ease 0.05s both; }
        .ip-fade-2 { animation: ip-fade 0.45s ease 0.15s both; }
        .ip-fade-3 { animation: ip-fade 0.45s ease 0.22s both; }

        /* Divider */
        .ip-hr { height: 1px; background: #FFE8D6; margin: 28px 0; }

        /* Responsive */
        @media (max-width: 900px) {
          .ip-grid { grid-template-columns: 1fr; }
          .ip-ai-panel { position: static; margin-top: 24px; }
        }
        @media (max-width: 560px) {
          .ip-inner { padding: 20px 14px 60px; }
        }
      `}</style>

      <div className="ip-root ip-page">
        <div className="ip-inner">

          {/* Role Header */}
          <div className="ip-fade-1">
            <RoleInfoHeader
              role={sessionData?.role || ""}
              topicsToFocusOn={sessionData?.topicsToFocusOn || ""}
              experienceLevel={sessionData?.experienceLevel || ""}
              description={sessionData?.description || ""}
              lastUpdated={
                sessionData?.updatedAt
                  ? moment(sessionData.updatedAt).format("DD MMM YYYY")
                  : ""
              }
            />
          </div>

          <div className="ip-hr" />

          {/* Section heading */}
          <div className="ip-section-head ip-fade-2">
            <span className="ip-pill"><LuSparkles size={11} /> Practice Questions</span>
            <h2 className="ip-fd" style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: "#111", marginTop: 10, marginBottom: 5 }}>
              Interview Questions
            </h2>
            <p style={{ fontSize: 14, color: "#999" }}>
              {sessionData?.questions?.length || 0} questions · Click "Learn More" for AI explanation
            </p>
          </div>

          {/* Grid: questions + AI panel */}
          <div className="ip-grid ip-fade-3">

            {/* ── LEFT: Questions ── */}
            <div>
              {sessionData?.questions?.map((data, index) => (
                <div key={data._id || index} className="ip-q-card">
                  {/* Question number strip */}
                  <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="ip-q-badge">Q{index + 1}</span>
                    <span style={{ fontSize: 11, color: "#bbb", fontWeight: 500 }}>
                      Question {index + 1} of {sessionData.questions.length}
                    </span>
                  </div>
                  <div style={{ padding: "4px 0" }}>
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                      isPinned={data.isPinned}
                    />
                  </div>
                </div>
              ))}

              {/* Load More */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
                <button
                  className="ip-load-btn"
                  disabled={isUpdateLoader}
                  onClick={uploadMoreQuestions}
                >
                  {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse size={16} />}
                  {isUpdateLoader ? "Adding Questions..." : "Load More Questions"}
                </button>
              </div>
            </div>

            {/* ── RIGHT: AI Panel ── */}
            <div className="ip-ai-panel">
              {/* Header */}
              <div className="ip-ai-header">
                <div className="ip-ai-icon">
                  <LuBrain size={18} color="#fff" />
                </div>
                <div>
                  <h3 className="ip-fd" style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>
                    AI Explanation
                  </h3>
                  <p style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>Powered by PrepAI</p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span className="ip-pill" style={{ fontSize: 10 }}><LuSparkles size={10} /> Live</span>
                </div>
              </div>

              {/* Body */}
              <div className="ip-ai-body">
                {/* Error */}
                {error && (
                  <div className="ip-error">
                    <LuCircleAlert size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                    {error}
                  </div>
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="ip-skel-wrap">
                    <SkeletonLoader />
                  </div>
                )}

                {/* Explanation */}
                {!isLoading && explanation && (
                  <AIResponsePreview content={explanation?.explanation} />
                )}

                {/* Empty */}
                {!explanation && !isLoading && !error && (
                  <div className="ip-ai-empty">
                    <div className="ip-ai-empty-icon">
                      <LuMessageSquare size={22} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, color: "#555", fontWeight: 600, marginBottom: 4 }}>
                        No explanation yet
                      </p>
                      <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6, maxWidth: 240 }}>
                        Click <strong style={{ color: "#FF9324" }}>"Learn More"</strong> on any question
                        to get a detailed AI explanation here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;