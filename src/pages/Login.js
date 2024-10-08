import React, { useState } from "react";
import { AArrowDown } from "lucide-react";
import BackgroundLogo from "../assets/images/login-banner.png";
import ItacLogo from "../assets/images/itac-logo.jpeg";
import SocialLogo from "../assets/images/Social-icon.png";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { email, password, rememberMe });
    navigate("/dashboard");
  };

  return (
    <div className="flex h-[100vh] max-w-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src={ItacLogo} alt="ITAC Logo" className="h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Log In</h2>
          <p className="text-gray-600 mb-6">
            Log In to manage your vendor account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember for 30 days
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot password
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              {/* <AArrowDown className="h-5 w-5 mr-2" /> */}
              <img
                src={SocialLogo}
                alt="Background"
                className="object-cover mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-yellow-400">
        <img
          src={BackgroundLogo}
          alt="Background"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
