"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import { BASE_URL } from "@/config";
import cls from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Role from "@/components/role";
import { toast } from "sonner";

// This is the navbar for the app
function navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");

  //this is the function for fetch role
  const fetchRole = async () => {
    setRole(await Role());
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const navItems = [
    {
      type: "student",
      items: ["Dashboard", "Posts","Profile", "Resume"],
    },
    { type: "admin", items: ["Dashboard", "Posts", "AddPosts", "Users",] },
    { type: "recruiter", items: ["Dashboard", "Recruiter"] },
  ];

  //this is the function for set tab
  const setTab = (item) => {
    router.push(`/${item}`);
  };

  //this is the function for logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}api/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.Status) {
        window.location.reload();
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar-header"]}></div>
      <ul className={styles["sidebar-list"]}>
        {navItems
          .find((item) => item.type === role)
          ?.items.map((item) => (
            <li
              className={cls(styles["sidebar-list-item"], {
                [styles.active]: pathname.slice(1) == item,
              })}
              key={item}
              onClick={() => setTab(item)}
            >
              <span>{item}</span>
            </li>
          ))}
      </ul>
      <div
        className={styles["account-info"]}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          <div className={styles["account-info-name"]}>Logout</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path
              d="M5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99933 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99933 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C12 4.28333 11.904 4.521 11.712 4.713C11.52 4.905 11.2827 5.00067 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C12 20.2833 11.904 20.521 11.712 20.713C11.52 20.905 11.2827 21.0007 11 21H5ZM17.175 13H10C9.71667 13 9.479 12.904 9.287 12.712C9.095 12.52 8.99933 12.2827 9 12C9 11.7167 9.096 11.479 9.288 11.287C9.48 11.095 9.71733 10.9993 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2873 16.571 16.012 16.563C15.7367 16.555 15.4993 16.4507 15.3 16.25C15.1167 16.05 15.029 15.8123 15.037 15.537C15.045 15.2617 15.141 15.0327 15.325 14.85L17.175 13Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default navbar;
