import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuSparkles, LuArrowRight, LuBriefcase, LuTrendingUp, LuBookOpen, LuFileText } from 'react-icons/lu';

const CreateSessionForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus, description } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all required fields");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                { role, experience, topicsToFocus, numberOfQuestions: 10 }
            );

            const generatedQuestions = aiResponse.data?.data || [];

            const response = await axiosInstance.post(
                API_PATHS.SESSION.CREATE,
                {
                    role,
                    experienceLevel: experience,
                    topicsToFocusOn: topicsToFocus.split(",").map(item => item.trim()),
                    description,
                    questions: generatedQuestions,
                }
            );

            if (response.data?.session?._id) {
                onSuccess && onSuccess();
                navigate(`/interview-prep/${response.data.session._id}`);
            }

        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while creating the session.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        {
            key: "role",
            label: "Target Role",
            placeholder: "e.g. Software Engineer",
            icon: <LuBriefcase size={15} />,
            required: true,
        },
        {
            key: "experience",
            label: "Experience Level",
            placeholder: "Fresher, Junior, Mid, Senior",
            icon: <LuTrendingUp size={15} />,
            required: true,
        },
        {
            key: "topicsToFocus",
            label: "Topics to Focus On",
            placeholder: "e.g. DSA, System Design",
            icon: <LuBookOpen size={15} />,
            required: true,
        },
        {
            key: "description",
            label: "Description",
            placeholder: "Anything specific? (optional)",
            icon: <LuFileText size={15} />,
            required: false,
        },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

                .csf-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
                .csf-fd { font-family: 'Sora', sans-serif !important; }

                .csf-wrap {
                    width: min(460px, 92vw);
                    padding: 32px 32px 28px;
                    display: flex;
                    flex-direction: column;
                    background: #fff;
                    border-radius: 24px;
                    border: 1.5px solid #FFE0C8;
                    box-shadow: 0 8px 48px rgba(255,147,36,0.11), 0 2px 12px rgba(0,0,0,0.05);
                }

                /* Badge */
                .csf-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: #FFF0E4; color: #c96a0a;
                    font-size: 11px; font-weight: 700;
                    padding: 4px 12px; border-radius: 100px;
                    border: 1px solid #FFCBA4; letter-spacing: 0.04em;
                    margin-bottom: 16px; align-self: flex-start;
                }

                /* Field */
                .csf-field { width: 100%; margin-bottom: 14px; }
                .csf-label {
                    display: flex; align-items: center; gap: 6px;
                    font-size: 12px; font-weight: 600;
                    color: #555; margin-bottom: 6px; letter-spacing: 0.03em;
                }
                .csf-label .csf-req {
                    color: #FF9324; font-size: 13px; line-height: 1;
                }
                .csf-input-wrap { position: relative; }
                .csf-icon {
                    position: absolute; left: 13px; top: 50%;
                    transform: translateY(-50%);
                    color: #ccc; pointer-events: none;
                    display: flex; align-items: center;
                }
                .csf-input {
                    width: 100%;
                    padding: 11px 14px 11px 38px;
                    border: 1.5px solid #E8E8E8;
                    border-radius: 12px;
                    font-size: 14px; color: #111;
                    background: #FAFAFA;
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    font-family: 'DM Sans', sans-serif;
                }
                .csf-input::placeholder { color: #bbb; }
                .csf-input:focus {
                    border-color: #FF9324;
                    box-shadow: 0 0 0 3px rgba(255,147,36,0.10);
                    background: #fff;
                }

                /* Error */
                .csf-error {
                    display: flex; align-items: center; gap: 6px;
                    background: #FFF3F3; border: 1px solid #FFD6D6;
                    color: #D94040; font-size: 12px; font-weight: 500;
                    padding: 9px 12px; border-radius: 10px;
                    margin-bottom: 12px;
                }

                /* Submit */
                .csf-btn {
                    width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    background: #111; color: #fff;
                    font-size: 14px; font-weight: 700;
                    padding: 13px; border-radius: 12px; border: none;
                    cursor: pointer; transition: background 0.18s, transform 0.15s;
                    font-family: 'DM Sans', sans-serif;
                    margin-top: 4px; letter-spacing: 0.01em;
                }
                .csf-btn:hover:not(:disabled) { background: #2a2a2a; transform: translateY(-1px); }
                .csf-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

                /* Loading state */
                .csf-loading-bar {
                    width: 100%; height: 3px; border-radius: 99px;
                    background: #FFE0C8; margin-bottom: 16px; overflow: hidden;
                }
                .csf-loading-bar-inner {
                    height: 100%; width: 40%;
                    background: #FF9324; border-radius: 99px;
                    animation: csf-slide 1.2s ease-in-out infinite;
                }
                @keyframes csf-slide {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(350%); }
                }

                @media (max-width: 480px) {
                    .csf-wrap { padding: 24px 18px 22px; }
                }
            `}</style>

            <div className="csf-wrap">

                {/* Badge */}
                <span className="csf-badge">
                    <LuSparkles size={11} /> New Session
                </span>

                {/* Heading */}
                <h3 className="csf-fd" style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 6 }}>
                    Start a New Interview Journey
                </h3>
                <p style={{ fontSize: 13, color: "#999", marginBottom: 22, lineHeight: 1.6 }}>
                    Fill out a few quick details and unlock your personalized set of interview questions.
                </p>

                {/* Loading bar */}
                {isLoading && (
                    <div className="csf-loading-bar">
                        <div className="csf-loading-bar-inner" />
                    </div>
                )}

                <form onSubmit={handleCreateSession}>
                    {fields.map(({ key, label, placeholder, icon, required }) => (
                        <div key={key} className="csf-field">
                            <label className="csf-label">
                                {label}
                                {required && <span className="csf-req">*</span>}
                            </label>
                            <div className="csf-input-wrap">
                                <span className="csf-icon">{icon}</span>
                                <input
                                    className="csf-input"
                                    type="text"
                                    value={formData[key]}
                                    onChange={({ target }) => handleChange(key, target.value)}
                                    placeholder={placeholder}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    ))}

                    {error && (
                        <div className="csf-error">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <button type="submit" className="csf-btn" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <SpinnerLoader />
                                Generating Questions...
                            </>
                        ) : (
                            <>
                                Create Session <LuArrowRight size={15} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateSessionForm;