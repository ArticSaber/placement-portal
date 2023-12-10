"use client";
import React from "react";
import { useRouter } from "next/navigation";

// This default export is required in a new `pages/_app.js` file.
function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/Dashboard");
  }, []);

  return null;
}

export default HomePage;
