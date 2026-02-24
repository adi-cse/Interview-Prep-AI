import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../Context/userContext";
import { LuSparkles, LuArrowRight, LuMail, LuLock } from "react-icons/lu";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setError("Please enter a valid email");
    }

    if (!password) {
      return setError("Please enter your password");
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password }
      );

      const token = response?.data?.token;

      if (!token) {
        return setError("Invalid server response");
      }

      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/dashboard");

    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .login-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .login-wrap .fd { font-family: 'Sora', sans-serif; }

        .login-wrap {
          width: min(420px, 92vw);
          padding: 36px 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #FFE0C8;
          box-shadow: 0 8px 48px rgba(255,147,36,0.11), 0 2px 12px rgba(0,0,0,0.05);
        }

        /* Logo badge */
        .login-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #FFF0E4; color: #c96a0a;
          font-size: 12px; font-weight: 600;
          padding: 5px 14px; border-radius: 100px;
          border: 1px solid #FFCBA4;
          margin-bottom: 20px;
        }

        /* Headings */
        .login-title {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #111; margin-bottom: 6px; text-align: center;
        }
        .login-sub {
          font-size: 13px; color: #999;
          margin-bottom: 28px; text-align: center;
        }

        /* Form */
        .login-form { width: 100%; }

        /* Field wrapper */
        .login-field { width: 100%; margin-bottom: 16px; }
        .login-field-label {
          display: block;
          font-size: 12px; font-weight: 600;
          color: #555; margin-bottom: 6px;
          letter-spacing: 0.03em;
        }
        .login-field-inner {
          position: relative; width: 100%;
        }
        .login-field-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: #ccc; pointer-events: none;
          display: flex; align-items: center;
        }
        .login-field-inner input {
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
        .login-field-inner input::placeholder { color: #bbb; }
        .login-field-inner input:focus {
          border-color: #FF9324;
          box-shadow: 0 0 0 3px rgba(255,147,36,0.10);
          background: #fff;
        }

        /* Error */
        .login-error {
          display: flex; align-items: center; gap: 6px;
          background: #FFF3F3; border: 1px solid #FFD6D6;
          color: #D94040; font-size: 12px; font-weight: 500;
          padding: 9px 12px; border-radius: 10px;
          margin-bottom: 14px; width: 100%;
        }

        /* Submit btn */
        .login-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #111; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 13px; border-radius: 12px; border: none;
          cursor: pointer; transition: background 0.18s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
          margin-top: 4px;
          letter-spacing: 0.01em;
        }
        .login-btn:hover { background: #2a2a2a; transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0); }

        /* Divider */
        .login-divider {
          display: flex; align-items: center; gap: 10px;
          width: 100%; margin: 20px 0 16px;
        }
        .login-divider-line { flex: 1; height: 1px; background: #FFE0C8; }
        .login-divider-text { font-size: 11px; color: #ccc; font-weight: 500; white-space: nowrap; }

        /* Signup link */
        .login-footer-text {
          font-size: 13px; color: #888; text-align: center; width: 100%;
        }
        .login-signup-btn {
          background: none; border: none; cursor: pointer;
          color: #FF9324; font-weight: 700; font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none; padding: 0;
          transition: color 0.18s;
        }
        .login-signup-btn:hover { color: #e8831d; text-decoration: underline; }

        @media (max-width: 480px) {
          .login-wrap { padding: 28px 20px 22px; }
        }
      `}</style>

      <div className="login-wrap">

        {/* Badge */}
        <div className="login-badge">
          <LuSparkles size={12} />
          Interview Prep AI
        </div>

        {/* Heading */}
        <h3 className="login-title">Welcome Back 👋</h3>
        <p className="login-sub">Sign in to continue your prep journey</p>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>

          {/* Email field */}
          <div className="login-field">
            <label className="login-field-label">Email Address</label>
            <div className="login-field-inner">
              <span className="login-field-icon"><LuMail size={15} /></span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="login-field">
            <label className="login-field-label">Password</label>
            <div className="login-field-inner">
              <span className="login-field-icon"><LuLock size={15} /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="login-btn">
            Sign In <LuArrowRight size={15} />
          </button>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">Don't have an account?</span>
            <div className="login-divider-line" />
          </div>

          {/* Signup link */}
          <div className="login-footer-text">
            <button
              type="button"
              className="login-signup-btn"
              onClick={() => setCurrentPage("signup")}
            >
              Create a free account →
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default Login;