"use client";

import React, { useState } from "react";
import styles from "@/styles/page.module.css";
import { BASE_URL } from "@/config";
import cls from "classnames";
import { usePathname, useRouter } from "next/navigation";

function navbar({ role }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const navItems = [
    {
      type: "admin",
      items: ["Dashboard", "posts", "Students"],
    },
    { type: "student", items: ["Dashboard", "Posts", "Profile", "Resume"] },
    { type: "recruiter", items: ["Dashboard", "posts", "Students"] },
  ];

  const setTab = (item) => {
    router.push(`/${item}`);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}api/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.Status) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar-header"]}>
        <div className={styles["app-icon"]}>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z"
            />
          </svg>
        </div>
      </div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cls(styles.feather, styles["feather-home"])}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
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