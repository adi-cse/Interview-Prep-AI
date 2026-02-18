import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../Context/userContext";

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

    // ✅ Save token
    localStorage.setItem("token", token);

    // ✅ Save full user object (backend already sends it)
    updateUser(response.data);

    navigate("/dashboard");

  } catch (err) {
    setError(err?.message || "Login failed");
  }
};


  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center items-center">

      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>

      <p className="text-xs text-slate-700 mt-1 mb-6">
        Please enter your details to login
      </p>

      <form onSubmit={handleLogin}>

        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {error && (
          <p className="text-red-500 text-xs pb-2">{error}</p>
        )}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-sm mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="underline text-primary"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>

      </form>
    </div>
  );
};

export default Login;
