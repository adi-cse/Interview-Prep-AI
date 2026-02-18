import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../Context/userContext";


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

      // ✅ Upload image first if selected
      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profileImageUrl = uploadResponse.data.imageUrl;
      }

      // ✅ Register user
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        { name, email, password, profileImageUrl }
      );

      const token = response?.data?.token;

      if (!token) {
        return setError("Invalid server response");
      }

      localStorage.setItem("token", token);
      updateUser(response.data);

      navigate("/dashboard");

    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

      <h3 className="text-lg font-semibold text-black">
        Create Account
      </h3>

      <p className="text-xs text-slate-700 mt-1 mb-6">
        Enter details below to sign up
      </p>

      <form onSubmit={handleSignUp}>

        {/* ✅ Profile Photo */}
        <ProfilePhotoSelector
          image={profileImage}
          setImage={setProfileImage}
        />

        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />

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
          SIGN UP
        </button>

        <p className="text-sm mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="underline text-primary"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>

      </form>
    </div>
  );
};

export default SignUp;
