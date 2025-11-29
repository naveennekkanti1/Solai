import React, { useEffect, useState } from "react";
import { Wifi, WifiOff, Loader2, Shield, AlertCircle } from "lucide-react";

const ALLOWED_IPS = ["223.187.115.11"]; // Add more if needed: ["IP1", "IP2"]

const WifiCheck = ({ children }) => {
  const [allowed, setAllowed] = useState(null);
  const [userIP, setUserIP] = useState("");
  const [lastChecked, setLastChecked] = useState(null);

  const checkIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const ip = data.ip;
      setUserIP(ip);
      setLastChecked(new Date());
      
      if (ALLOWED_IPS.includes(ip)) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    } catch (error) {
      setAllowed(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkIP();
    const interval = setInterval(() => {
      checkIP();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (allowed === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying Network
          </h2>
          <p className="text-gray-600">
            Please wait while we check your connection...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Access denied state
  if (!allowed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <WifiOff className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Access Not Allowed
            </h2>
            <p className="text-gray-600">
              You need to connect to an authorized network to access this content.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 mb-1">
                  Current IP Address
                </p>
                <p className="text-sm text-red-700 font-mono">
                  {userIP || "Unable to detect"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p className="font-medium text-gray-700">To gain access:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Connect to the authorized WiFi network</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Contact your administrator if you believe this is an error</span>
              </li>
            </ul>
          </div>

          <button
            onClick={checkIP}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Wifi className="w-5 h-5" />
            <span>Retry Connection</span>
          </button>

          {lastChecked && (
            <p className="text-xs text-gray-400 text-center mt-4">
              Last checked: {lastChecked.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Access granted - show children with subtle indicator
  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-200 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Secured Connection</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      {children}
    </div>
  );
};

// Demo component to show it in action
const App = () => {
  return (
    <WifiCheck>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to Secure Content
            </h1>
            <p className="text-gray-600">
              You have successfully connected from an authorized network.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Protected Content Area
            </h2>
            <p className="text-gray-700 mb-4">
              This is your secure content that only authorized users can see. 
              The system automatically verifies your network connection every 10 seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h3 className="font-medium text-gray-800 mb-2">Feature 1</h3>
                <p className="text-sm text-gray-600">Access to exclusive resources</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h3 className="font-medium text-gray-800 mb-2">Feature 2</h3>
                <p className="text-sm text-gray-600">Real-time network monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WifiCheck>
  );
};

export default App;