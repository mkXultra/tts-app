"use client";

import { CorbadoAuth } from "@corbado/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const onLoggedIn = () => {
    window.location.href = "/tts";

  };

  const navigateToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="shadow-effect">
      {/* <Login onLoggedIn={onLoggedIn} navigateToSignUp={navigateToSignup} /> */}
      <CorbadoAuth onLoggedIn={onLoggedIn} navigateToSignUp={navigateToSignup} /> 
    </div>
  );
}