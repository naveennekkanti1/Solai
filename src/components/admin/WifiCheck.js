import React, { useEffect, useState } from "react";

const ALLOWED_IPS = ["223.187.115.11"]; 
// Add more if needed: ["IP1", "IP2"]

const WifiCheck = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  const checkIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const userIP = data.ip;

      if (ALLOWED_IPS.includes(userIP)) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    } catch (error) {
      setAllowed(false);
    }
  };

  useEffect(() => {
    // Run initially
    checkIP();

    // Run every 10 seconds
    const interval = setInterval(() => {
      checkIP();
    }, 10000);

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  if (allowed === null) return <div>Checking network...</div>;

  if (!allowed)
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold text-red-600">
        ❌ Access Not Allowed — Connect to Allowed WiFi
      </div>
    );

  return children;
};

export default WifiCheck;
