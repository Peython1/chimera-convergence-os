
import LoginScreen from "@/components/login/LoginScreen";
import { useState, useEffect } from "react";
import Desktop from "@/components/desktop/Desktop";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Simulate automatic login after 2 seconds for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return <Desktop />;
};

export default Index;
