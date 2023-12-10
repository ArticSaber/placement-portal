"use client"
import React, { useState, useEffect, useRef } from 'react';
import userId from '@/components/userId';
import { BASE_URL } from '@/config';
import styles from '@/styles/resume.module.css';
import ReactToPrint from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const UID = await userId();
      fetchUserDetails(UID);
    };

    fetchUserId();
  }, []);

  const fetchUserDetails = async (UID) => {
    fetch(BASE_URL + "api/getuserdetails/" + UID, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data.user);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={ref} className={styles.printable}>
      <div className={styles.resumeContainer}>
        <div className={styles.header}>Resume</div>

        <section className={styles.personalDetails}>
          <div className={styles.leftColumn}>
            <div className={styles.detail}>Name: {userDetails.name}</div>
            <div className={styles.detail}>Age: {userDetails.age}</div>
            <div className={styles.detail}>Email: {userDetails.email}</div>
            <div className={styles.detail}>
              Phone Number: {userDetails.phoneNumber}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.detail}>GitHub: {userDetails.github}</div>
            <div className={styles.detail}>
              LinkedIn: {userDetails.linkedin}
            </div>
          </div>
        </section>

        <section className={styles.projects}>
          <div className={styles.header}>Projects</div>
          {userDetails.projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.header}>Project {index + 1}</div>
              <div className={styles.detail}>Name: {project.projectName}</div>
              <div className={styles.detail}>
                Description: {project.description}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
});

function ResumePage() {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-28 flex justify-center mx-auto mt-4"
          >
            Download
          </button>
        )}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>
  );
}

export default ResumePage;