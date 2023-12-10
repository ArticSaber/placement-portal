"use client";
import React, { useState, useEffect, use } from "react";
import styles from "@/styles/profile.module.css";
import axios from "axios";
import cls from "classnames";
import userId from "@/components/userId";
import { BASE_URL } from "@/config";

function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    email: "",
    github: "",
    linkedin: "",
    projects: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const UID = await userId();
      console.log(UID);
      fetchUserDetails(UID);
    };

    fetchUserId();
  }, []);

  const fetchUserDetails = async (UID) => {
    fetch(BASE_URL + "api/getuserdetails/" + UID, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setForm(data.user);
        if (data._id) {
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleProjectChange = (index, event) => {
    const newProjects = [...form.projects];
    newProjects[index][event.target.name] = event.target.value;
    setForm({
      ...form,
      projects: newProjects,
    });
  };

  const handleAddProject = () => {
    setForm((prevForm) => ({
      ...prevForm,
      projects: [
        ...(prevForm.projects || []),
        { projectName: "", description: "", HostedLink: "" },
      ],
    }));
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...form.projects];
    newProjects.splice(index, 1);
    setForm({
      ...form,
      projects: newProjects,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    if (form._id) {
      axios
        .put(BASE_URL + "api/update/" + form._id, form)
        .then((response) => {
          console.log(response);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(BASE_URL + "api/adduserdetails", form)
        .then((response) => {
          console.log(response);
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <form className={styles["profile-form"]} onSubmit={handleSubmit}>
        <label className={styles["form-label"]}>
          Name:
          <input
            className={styles["form-input"]}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          Age:
          <input
            className={styles["form-input"]}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          Phone Number:
          <input
            className={styles["form-input"]}
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          Email:
          <input
            className={styles["form-input"]}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          GitHub:
          <input
            className={styles["form-input"]}
            type="url"
            name="github"
            value={form.github}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          LinkedIn:
          <input
            className={styles["form-input"]}
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            required
          />
        </label>
        {form?.projects?.length > 0
          ? form.projects.map((project, index) => (
              <div key={index}>
                <label className={styles["form-label"]}>
                  Project Name:
                  <input
                    className={styles["form-input"]}
                    type="text"
                    name="projectName"
                    value={project.projectName}
                    onChange={(event) => handleProjectChange(index, event)}
                    required
                  />
                </label>
                <label className={styles["form-label"]}>
                  Description:
                  <input
                    className={styles["form-input"]}
                    name="description"
                    value={project.description}
                    onChange={(event) => handleProjectChange(index, event)}
                    required
                  />
                </label>
                <label className={styles["form-label"]}>
                  Hosted Link:
                  <input
                    className={styles["form-input"]}
                    name="HostedLink"
                    value={project.HostedLink}
                    onChange={(event) => handleProjectChange(index, event)}
                    required
                  />
                </label>
                <button
                  className={styles["cancel-button"]}
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                >
                  Remove
                </button>
              </div>
            ))
          : // <div>
            //   <label className={styles["form-label"]}>
            //     Project Name:
            //     <input
            //       className={styles["form-input"]}
            //       type="text"
            //       name="projectName"
            //       value=""
            //       onChange={(event) => handleProjectChange(1, event)}
            //       required
            //     />
            //   </label>
            //   <label className={styles["form-label"]}>
            //     Description:
            //     <input
            //       className={styles["form-input"]}
            //       name="description"
            //       value=""
            //       onChange={(event) => handleProjectChange(1, event)}
            //       required
            //     />
            //   </label>
            //   <label className={styles["form-label"]}>
            //     Hosted Link:
            //     <input
            //       className={styles["form-input"]}
            //       name="HostedLink"
            //       value=""
            //       onChange={(event) => handleProjectChange(1, event)}
            //       required
            //     />
            //   </label>
            // </div>
            null}
        <button
          className={styles["form-button"]}
          type="button"
          onClick={handleAddProject}
        >
          Add Project
        </button>
        <button
          className={cls(styles["form-button"], styles["submit-button"])}
          type="submit"
          disabled={!isEditing}
        >
          {form._id ? "Update" : "Submit"}
        </button>
        {form._id && !isEditing && (
          <button
            className={cls(styles["form-button"], styles["edit-button"])}
            type="button"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
