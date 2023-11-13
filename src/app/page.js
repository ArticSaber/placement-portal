"use client"
import React from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/dashboard');
  }, []);

  return null;
}

export default HomePage;