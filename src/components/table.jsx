"use client";

import { BASE_URL } from "@/config";
import styles from "@/styles/page.module.css";
import cls from "classnames";
import { useEffect, useState } from "react";
import Role from "./role";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// This is the main table for the app
const Table = ({ data, type }) => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [addUser, setAddUser] = useState({
    email: "",
    password: "",
    role: "user",
    active: true,
  });

  const fetchRole = async () => {
    setRole(await Role());
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleAddChange = (e) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddActiveChange = (e) => {
    setAddUser({
      ...addUser,
      active: e.target.value === "Active",
    });
  };
  const handleAddRoleChange = (event) => {
    setAddUser({
      ...addUser,
      role: event.target.value,
    });
  };

  //this is the function for add user
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 200) {
        setAdd(false);
        setAddUser({
          email: "",
          password: "",
          role: "",
          active: true,
        });
        toast.success(data.message);
        router.refresh();
      } else if (response.status === 400) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleEdit = (data) => {
    setCurrentUser(data);
    setEdit(!edit);
  };

  const handleInputChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleActiveChange = (e) => {
    setCurrentUser({
      ...currentUser,
      active: e.target.value === "Active",
    });
  };

  //this is the function for update user
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
        credentials: "include",
      });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
    setEdit(false);
    setCurrentUser(null);
  };

  //this is the function for delete user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}api/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      {/*This is the header for the table */}
      {type !== "user" && (
        <div className={styles["app-content-header"]}>
          <h1 className={styles["app-content-headerText"]}>Users</h1>
          <button
            className={styles["app-content-headerButton"]}
            onClick={() => setAdd(true)}
          >
            Add User
          </button>
        </div>
      )}
      <div className={cls(styles["products-area-wrapper"], styles.tableView)}>
        <div className={styles["products-header"]}>
          <div className={cls(styles["product-cell"], styles.image)}>Name</div>
          <div className={cls(styles["product-cell"], styles["status-cell"])}>
            Status
          </div>
          <div className={cls(styles["product-cell"], styles.sales)}>
            Create Date
          </div>
          <div className={cls(styles["product-cell"], styles.stock)}>Type</div>
          <div className={cls(styles["product-cell"], styles.price)}>Role</div>
          <div className={cls(styles["product-cell"], styles.price)}>View</div>
          <div className={cls(styles["product-cell"], styles.price)}>
            Delete
          </div>
        </div>

        {/*This is the body for the table */}
        {data?.map((item) => {
          const date = new Date(item.createdAt);
          const formattedDate = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          return (
            <div key={item._id} className={cls(styles["products-row"])}>
              <div className={cls(styles["product-cell"], styles.flex)}>
                <img
                  className={styles.image}
                  src="https://avatars.githubusercontent.com/u/39374797?v=4"
                  alt="product"
                />
                <span>{item.email}</span>
              </div>

              <div
                className={cls(styles["product-cell"], styles["status-cell"])}
              >
                <span className={styles["cell-label"]}>Status:</span>
                {item.active ? (
                  <span className={cls(styles.status, styles.active)}>
                    Active
                  </span>
                ) : (
                  <span className={cls(styles.status, styles.disabled)}>
                    Disabled
                  </span>
                )}
              </div>
              <div className={cls(styles["product-cell"], styles.category)}>
                <span className={styles["cell-label"]}>Created Date:</span>
                {formattedDate}
              </div>
              <div className={cls(styles["product-cell"], styles.sales)}>
                <span className={styles["cell-label"]}>Role:</span>
                {item.role}
              </div>
              <div className={cls(styles["product-cell"], styles.price)}>
                <span className={styles["cell-label"]}>Role:</span>
                {item.role}
              </div>

              <div className={cls(styles["product-cell"], styles.price)}>
                <button
                  className={styles["edit-button"]}
                  onClick={() => handleEdit(item)}
                >
                  View User
                </button>
              </div>

              {/* This is the edit modal for the table */}
              {edit && (
                <div className={styles.modal}>
                  <form
                    className={styles["modal-content"]}
                    onSubmit={(e) => {
                      handleUpdate(e, currentUser._id);
                    }}
                  >
                    <div className={styles["modal-title"]}>Edit User</div>
                    <div className={styles["form-item"]}>
                      <label>Email Id:</label>
                      <input
                        type="email"
                        name="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles["form-item"]}>
                      <label>Status:</label>
                      <select
                        value={currentUser.active ? "Active" : "Inactive"}
                        onChange={handleActiveChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className={styles["form-item"]}>
                      <label>Role:</label>
                      <select
                        name="role"
                        value={currentUser.role}
                        onChange={handleInputChange}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        {role == "superadmin" && (
                          <option value="superadmin">superadmin</option>
                        )}
                      </select>
                    </div>
                    <div className={styles["nav-button-container"]}>
                      <button
                        className={styles["cancel-btn"]}
                        onClick={() => {
                          setEdit(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button className={styles["update-btn"]} type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* This is the add modal for the table */}
              {add && (
                <div className={styles.modal}>
                  <form
                    className={styles["modal-content"]}
                    onSubmit={handleAdd}
                  >
                    <div className={styles["modal-title"]}>Add User</div>
                    <div className={styles["form-item"]}>
                      <label>Email Id:</label>
                      <input
                        type="email"
                        name="email"
                        value={addUser.email}
                        onChange={handleAddChange}
                      />
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={addUser.password}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div className={styles["form-item"]}>
                      <label>Status:</label>
                      <select
                        value={addUser.active ? "Active" : "Inactive"}
                        onChange={handleAddActiveChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div className={styles["form-item"]}>
                      <label>Role:</label>
                      <select
                        name="role"
                        value={addUser.role}
                        onChange={handleAddRoleChange}
                      >
                        <option value="user">user</option>
                        {role == "superadmin" && (
                          <>
                            <option value="admin">admin</option>
                            <option value="superadmin">superadmin</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div className={styles["nav-button-container"]}>
                      <button
                        className={styles["cancel-btn"]}
                        onClick={() => {
                          setAdd(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button className={styles["update-btn"]} type="submit">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className={cls(styles["product-cell"], styles.price)}>
                <button
                  className={styles["delete-button"]}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Table;
