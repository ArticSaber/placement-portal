"use client";
import styles from "@/styles/page.module.css";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";

// This is the wrapper for the app
const Wrapper = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("login") || pathname.includes("signup") ? (
        children
      ) : (
        <main className={styles.main}>
          <div className={styles["app-container"]}>
            <Navbar />
            <div className={styles["app-content"]}>{children}</div>
          </div>
        </main>
      )}
    </>
  );
};

export default Wrapper;
