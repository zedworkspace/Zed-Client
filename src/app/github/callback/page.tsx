"use client";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";

const GitHubCallback = () => {
  const router = useRouter();

  const handleGitHubAuth = useCallback(async (code: string) => {
    try {
      const res = await axios.post<{ accessToken: string }>(
        "http://localhost:5000/api/v1/auth/github/callback",
        { code }
      );

      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      router.replace("/");
    } catch (error) {
      console.error("GitHub login failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred");
      }
      router.replace("/signin");
    }
  }, [router]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      handleGitHubAuth(code);
    } else {
      router.replace("/signin"); // Redirect to login if no code found
    }
  }, [handleGitHubAuth, router]);

  return (
    <div className="flex items-center justify-center min-h-screen rounded-md bg-transparent">
      <div className="flex flex-col items-center space-y-4">
        <ThreeDot color="#FFFFFF" size="medium" text="" textColor="#FFFFFF" />
      </div>
    </div>
  );
};

export default GitHubCallback;
