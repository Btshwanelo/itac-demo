import React from "react";
import { Check } from "lucide-react";
import ItacLogo from "../assets/images/itac-logo.jpeg";
import { useNavigate } from "react-router-dom";

const ThankYouScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <div className="mx-auto h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Thank you!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Great news! We've received your update and will promptly review
              your property to make the necessary adjustments.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-400 text-sm font-medium rounded-md shadow-sm   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <img src={ItacLogo} alt="ITAC Logo" className="h-8" />
          </div>
          <div className="text-sm text-gray-500">© 2024 ITAC</div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouScreen;
