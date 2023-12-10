// Desc: Configuration file for the application
export const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://rbms-next.vercel.app/";
