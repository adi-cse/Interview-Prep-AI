import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = ({ onSuccess }) => {   // ✅ prop added

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
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
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

            // 1️⃣ Generate Questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            const generatedQuestions = aiResponse.data?.data || [];

            // 2️⃣ Create Session
            const response = await axiosInstance.post(
                API_PATHS.SESSION.CREATE,
                {
                    role,
                    experienceLevel: experience,
                    topicsToFocusOn: topicsToFocus
                        .split(",")
                        .map(item => item.trim()),
                    description,
                    questions: generatedQuestions,
                }
            );

            if (response.data?.session?._id) {

                onSuccess && onSuccess();   // ✅ modal close + refresh

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

    return (
        <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">

            <h3 className="text-lg font-semibold text-black">
                Start a New Interview Journey
            </h3>

            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Fill out a few quick details and unlock your personalized set of interview questions.
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">

                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="e.g. Software Engineer"
                    type="text"
                />

                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Experience Level"
                    placeholder="Fresher, Junior, Mid, Senior"
                    type="text"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On"
                    placeholder="e.g. DSA, System Design"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="Anything specific?"
                    type="text"
                />

                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <button
                    type="submit"
                    className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader />}
                    {isLoading ? "Creating..." : "Create Session"}
                </button>

            </form>
        </div>
    );
};

export default CreateSessionForm;
