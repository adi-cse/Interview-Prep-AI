import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
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
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(id)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch {
      toast.error("Failed to fetch session details");
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch {
      setError("Failed to generate explanation");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experienceLevel,
          topicsToFocus: Array.isArray(sessionData?.topicsToFocusOn)
            ? sessionData?.topicsToFocusOn.join(", ")
            : sessionData?.topicsToFocusOn,
          numberOfQuestions: 5,
        }
      );

      const generatedQuestions = response.data?.data;

      await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId: id,
          questions: generatedQuestions,
        }
      );

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
        <div className="flex justify-center items-center h-64">
          <SpinnerLoader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Role Header */}
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

          {/* Page Title */}
          <div className="mt-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Interview Questions
            </h2>
            <p className="text-gray-500 mt-2">
              Practice consistently and master your concepts.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ================= LEFT QUESTIONS ================= */}
            <div className="lg:col-span-2">

              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="mb-6 backdrop-blur-lg bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 transition"
                  >
                    <QuestionCard
                      question={data.question}
                      answer={data.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data.isPinned}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Button */}
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 text-sm text-white font-medium bg-gradient-to-r from-black to-gray-800 px-8 py-3 rounded-full shadow-xl"
                  disabled={isUpdateLoader}
                  onClick={uploadMoreQuestions}
                >
                  {isUpdateLoader ? (
                    <SpinnerLoader />
                  ) : (
                    <LuListCollapse className="text-lg" />
                  )}
                  Load More Questions
                </motion.button>
              </div>
            </div>

            {/* ================= RIGHT AI PANEL ================= */}
            <div className="sticky top-24 h-fit">

              <div className="backdrop-blur-lg bg-white/70 border border-white/40 shadow-2xl rounded-2xl p-6 min-h-[300px]">
                <h3 className="text-lg font-semibold mb-4">
                  AI Explanation Panel
                </h3>

                {error && (
                  <p className="flex gap-2 text-sm text-amber-600 font-medium">
                    <LuCircleAlert className="mt-1" />
                    {error}
                  </p>
                )}

                {isLoading && <SkeletonLoader />}

                {!isLoading && explanation && (
                  <AIResponsePreview
                    content={explanation?.explanation}
                  />
                )}

                {!explanation && !isLoading && (
                  <p className="text-gray-400 text-sm">
                    Click "Learn More" on any question to see
                    detailed AI explanation here.
                  </p>
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
