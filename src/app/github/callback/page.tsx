"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";

const GitHubCallback = () => {
  const navigate = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      handleGitHubAuth(code);
    } else {
      navigate.replace("/signin"); // Redirect to login if no code found
    }
  }, []);

  const handleGitHubAuth = async (code: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/github/callback", { code });

      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      navigate.replace("/");
    } catch (error : any) {
      console.error("GitHub login failed:", error);
      alert(error.response.data.message)
      navigate.replace("/signin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-md bg-transparent">
    <div className="flex flex-col items-center space-y-4">
      <ThreeDot color="#FFFFFF" size="medium" text="" textColor="#FFFFFF" />
    </div>
  </div>
  )
};

export default GitHubCallback;
