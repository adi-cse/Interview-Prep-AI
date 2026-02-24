import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../Context/userContext";
import { LuSparkles, LuArrowRight, LuMail, LuLock, LuUser } from "react-icons/lu";

const SignUp = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) return setError("Enter your full name");
    if (!validateEmail(email)) return setError("Enter valid email");
    if (!password) return setError("Enter password");

    setError("");

    try {
      let profileImageUrl = null;

      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        profileImageUrl = uploadResponse.data.imageUrl;
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        { name, email, password, profileImageUrl }
      );

      const token = response?.data?.token;

      if (!token) return setError("Invalid server response");

      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");

    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .signup-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .signup-wrap {
          width: min(420px, 92vw);
          padding: 32px 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #FFE0C8;
          box-shadow: 0 8px 48px rgba(255,147,36,0.11), 0 2px 12px rgba(0,0,0,0.05);
        }

        /* Badge */
        .signup-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #FFF0E4; color: #c96a0a;
          font-size: 12px; font-weight: 600;
          padding: 5px 14px; border-radius: 100px;
          border: 1px solid #FFCBA4;
          margin-bottom: 16px;
        }

        /* Headings */
        .signup-title {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #111; margin-bottom: 5px; text-align: center;
        }
        .signup-sub {
          font-size: 13px; color: #999;
          margin-bottom: 20px; text-align: center;
        }

        /* Photo selector centering */
        .signup-photo-wrap {
          width: 100%; display: flex;
          justify-content: center; margin-bottom: 18px;
        }

        /* Form */
        .signup-form { width: 100%; }

        /* Field */
        .signup-field { width: 100%; margin-bottom: 14px; }
        .signup-field-label {
          display: block;
          font-size: 12px; font-weight: 600;
          color: #555; margin-bottom: 6px;
          letter-spacing: 0.03em;
        }
        .signup-field-inner { position: relative; width: 100%; }
        .signup-field-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: #ccc; pointer-events: none;
          display: flex; align-items: center;
        }
        .signup-field-inner input {
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
        .signup-field-inner input::placeholder { color: #bbb; }
        .signup-field-inner input:focus {
          border-color: #FF9324;
          box-shadow: 0 0 0 3px rgba(255,147,36,0.10);
          background: #fff;
        }

        /* Error */
        .signup-error {
          display: flex; align-items: center; gap: 6px;
          background: #FFF3F3; border: 1px solid #FFD6D6;
          color: #D94040; font-size: 12px; font-weight: 500;
          padding: 9px 12px; border-radius: 10px;
          margin-bottom: 12px; width: 100%;
        }

        /* Submit btn — black */
        .signup-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #111; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 13px; border-radius: 12px; border: none;
          cursor: pointer; transition: background 0.18s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
          margin-top: 4px; letter-spacing: 0.01em;
        }
        .signup-btn:hover { background: #2a2a2a; transform: translateY(-1px); }
        .signup-btn:active { transform: translateY(0); }

        /* Divider */
        .signup-divider {
          display: flex; align-items: center; gap: 10px;
          width: 100%; margin: 18px 0 14px;
        }
        .signup-divider-line { flex: 1; height: 1px; background: #FFE0C8; }
        .signup-divider-text { font-size: 11px; color: #ccc; font-weight: 500; white-space: nowrap; }

        /* Login link */
        .signup-login-btn {
          background: none; border: none; cursor: pointer;
          color: #FF9324; font-weight: 700; font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          padding: 0; transition: color 0.18s;
          display: block; width: 100%; text-align: center;
        }
        .signup-login-btn:hover { color: #e8831d; text-decoration: underline; }

        @media (max-width: 480px) {
          .signup-wrap { padding: 24px 18px 22px; }
        }
      `}</style>

      <div className="signup-wrap">

        {/* Badge */}
        <div className="signup-badge">
          <LuSparkles size={12} />
          Interview Prep AI
        </div>

        {/* Heading */}
        <h3 className="signup-title">Create Account 🚀</h3>
        <p className="signup-sub">Start your interview prep journey today</p>

        {/* Profile Photo */}
        <div className="signup-photo-wrap">
          <ProfilePhotoSelector
            image={profileImage}
            setImage={setProfileImage}
          />
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSignUp}>

          {/* Name */}
          <div className="signup-field">
            <label className="signup-field-label">Full Name</label>
            <div className="signup-field-inner">
              <span className="signup-field-icon"><LuUser size={15} /></span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="signup-field">
            <label className="signup-field-label">Email Address</label>
            <div className="signup-field-inner">
              <span className="signup-field-icon"><LuMail size={15} /></span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="signup-field">
            <label className="signup-field-label">Password</label>
            <div className="signup-field-inner">
              <span className="signup-field-icon"><LuLock size={15} /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="signup-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="signup-btn">
            Create Account <LuArrowRight size={15} />
          </button>

          {/* Divider */}
          <div className="signup-divider">
            <div className="signup-divider-line" />
            <span className="signup-divider-text">Already have an account?</span>
            <div className="signup-divider-line" />
          </div>

          {/* Login link */}
          <button
            type="button"
            className="signup-login-btn"
            onClick={() => setCurrentPage("login")}
          >
            Sign in instead →
          </button>

        </form>
      </div>
    </>
  );
};

export default SignUp;