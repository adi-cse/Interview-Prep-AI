import React, { useState, useEffect } from "react";
import { LuPlus, LuBrain, LuRocket, LuChartBar } from "react-icons/lu";
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
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // ================= FETCH ALL SESSIONS =================
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

  // ================= DELETE SESSION =================
  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionData?._id)
      );
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch {
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const totalQuestions = sessions.reduce(
    (acc, s) => acc + (s.questions?.length || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="relative container mx-auto pt-6 pb-16 px-4">

        {/* Gradient Glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-orange-200 via-yellow-100 to-white -z-10 blur-3xl opacity-60"></div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : sessions.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h1 className="text-4xl font-bold text-gray-800">
                Ace Your Interviews with Confidence 🚀
              </h1>

              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Create smart interview preparation sessions, track your
                progress, and boost your confidence with structured practice.
              </p>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-8 bg-gradient-to-r from-[#FF9324] to-[#E99A4B] text-white px-8 py-3 rounded-full shadow-lg"
                onClick={() => setOpenCreateModal(true)}
              >
                Create Your First Session
              </motion.button>
            </motion.div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              {[
                {
                  icon: <LuBrain size={30} />,
                  title: "Smart Practice",
                  desc: "Structured interview sessions tailored to your role."
                },
                {
                  icon: <LuChartBar size={30} />,
                  title: "Track Progress",
                  desc: "Monitor total questions and improvement trends."
                },
                {
                  icon: <LuRocket size={30} />,
                  title: "Boost Confidence",
                  desc: "Practice consistently and build real confidence."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-center"
                >
                  <div className="flex justify-center text-orange-500 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500 mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </>
        ) : (

          /* ================= DASHBOARD WITH SESSIONS ================= */
          <>
            {/* Header + Add Button */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Interview Sessions
              </h2>

              <button
                onClick={() => setOpenCreateModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#FF9324] to-[#E99A4B] text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
              >
                <LuPlus size={18} />
                Add Session
              </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white shadow-lg rounded-2xl p-6">
                <h3 className="text-gray-500 text-sm">Total Sessions</h3>
                <p className="text-3xl font-bold mt-2">
                  {sessions.length}
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6">
                <h3 className="text-gray-500 text-sm">Total Questions</h3>
                <p className="text-3xl font-bold mt-2">
                  {totalQuestions}
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6">
                <h3 className="text-gray-500 text-sm">Last Updated</h3>
                <p className="text-lg font-semibold mt-2">
                  {sessions[0]?.updatedAt
                    ? moment(sessions[0].updatedAt).format("Do MMM YYYY")
                    : "-"}
                </p>
              </div>
            </div>

            {/* Session Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {sessions.map((data, index) => (
                <motion.div
                  key={data?._id}
                  whileHover={{ y: -8 }}
                  className="bg-white shadow-xl rounded-2xl"
                >
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocusOn || ""}
                    experience={data?.experienceLevel || "-"}
                    questions={data?.questions?.length || "-"}
                    description={data?.description || ""}
                    lastUpdated={
                      data?.updatedAt
                        ? moment(data.updatedAt).format("Do MMM YYYY")
                        : ""
                    }
                    onSelect={() =>
                      navigate(`/interview-prep/${data?._id}`)
                    }
                    onDelete={() =>
                      setOpenDeleteAlert({ open: true, data })
                    }
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ================= CREATE MODAL ================= */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }}
        />
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() =>
          setOpenDeleteAlert({ open: false, data: null })
        }
      >
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
