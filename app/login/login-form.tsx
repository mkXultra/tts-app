"use client";

import { CorbadoAuth } from "@corbado/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const onLoggedIn = () => {
    router.push("/tts");
  };

  return (
    <div className="shadow-effect">
      <CorbadoAuth onLoggedIn={onLoggedIn} /> 
    </div>
  );
}