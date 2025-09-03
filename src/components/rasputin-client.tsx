"use client";

import { useEffect, useState } from "react";
import { Clock, RefreshCw, Smartphone, Copy, Check } from "lucide-react";

interface OtpData {
  success: boolean;
  otp: string;
  expiryTime: string;
  remainingTime: number;
}

interface ErrorResponse {
  message: string;
  error: boolean;
  data?: any;
}

interface RasputinClientProps {
  initialOtpData: OtpData | ErrorResponse;
}

export default function RasputinClient({
  initialOtpData,
}: RasputinClientProps) {
  const [otpData, setOtpData] = useState<OtpData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize with server data
  useEffect(() => {
    if ("success" in initialOtpData && initialOtpData.success) {
      setOtpData(initialOtpData);
      setTimeRemaining(initialOtpData.remainingTime);
      setError(null);
    } else {
      const errorResult = initialOtpData as ErrorResponse;
      setError(errorResult.message || "Failed to get OTP");
    }
  }, [initialOtpData]);

  const refreshPage = () => {
    window.location.reload();
  };

  const copyOtp = async () => {
    if (otpData?.otp) {
      await navigator.clipboard.writeText(otpData.otp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            window.location.reload();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    // Assuming 2 minutes (120 seconds) is the total time
    const totalTime = 120;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  if (error) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-[#111111] border border-red-500/20 rounded-3xl p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <RefreshCw className="h-5 w-5 text-red-400" />
          </div>
          <h3 className="text-white font-medium mb-2">Connection Error</h3>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={refreshPage}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-semibold text-white">Rasputin</h1>
        <p className="text-gray-400 text-sm">
          Your temporary verification code
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#111111] border border-gray-800/50 rounded-3xl p-8">
        {/* OTP Display */}
        <div className="text-center space-y-6">
          {/* OTP Code */}
          <div className="relative">
            <div className="flex justify-center gap-3 mb-4">
              {(otpData?.otp ?? "000000").split("").map((digit, index) => (
                <div
                  key={index}
                  className="w-12 h-14 bg-[#1a1a1a] border border-gray-700/50 rounded-xl flex items-center justify-center text-xl font-mono text-white"
                >
                  {digit}
                </div>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={copyOtp}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy code</span>
                </>
              )}
            </button>
          </div>

          {/* Timer Section */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 rounded-full"
                style={{
                  background: timeRemaining <= 30 
                    ? 'linear-gradient(to right, var(--halloween-red), #FF69B4)' 
                    : 'linear-gradient(to right, var(--halloween-orange), var(--halloween-red))',
                  width: `${100 - getProgressPercentage()}%`
                }}
              />
            </div>

            {/* Timer Text */}
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-400">Expires in</span>
              <span
                className={`font-mono text-sm font-medium ${
                  timeRemaining <= 30 ? "text-red-400" : "text-white"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshPage}
            className="w-full py-3.5 bg-[#1a1a1a] hover:bg-[#222222] border border-gray-700/50 text-gray-300 hover:text-white rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          Don't have the app?{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Download here
          </a>
        </p>
      </div>
    </div>
  );
}
