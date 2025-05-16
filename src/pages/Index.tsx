
import LoginScreen from "@/components/login/LoginScreen";
import { useState, useEffect } from "react";
import Desktop from "@/components/desktop/Desktop";
import { toast } from "sonner";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Simulate automatic login after 3 seconds for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
      toast.success("Logged in successfully", {
        description: "Welcome to Chimera OS"
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Desktop />;
};

export default Index;
