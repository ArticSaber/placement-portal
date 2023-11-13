"use client";
import styles from "@/styles/page.module.css";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";
import Role from "@/components/role";
import { useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const [role, setRole] = useState("");

  const pathname = usePathname();

  const fetchRole = async () => {
    setRole(await Role());
  };


  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <>
      {pathname.includes("login") || pathname.includes("signup") ? (
        children
      ) : (
        <main className={styles.main}>
          <div className={styles["app-container"]}>
            <Navbar role={role} />
            <div className={styles["app-content"]}>{children}</div>
          </div>
        </main>
      )}
    </>
  );
};

export default Wrapper;
