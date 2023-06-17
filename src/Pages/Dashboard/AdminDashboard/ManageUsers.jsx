import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useAxiosSecure from "../../Shared/useAxiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const [disabledButtons, setDisabledButtons] = useState([]);

  useEffect(() => {
    // Fetch users data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users"); // Replace with your API endpoint for fetching users
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const makeInstructor = async (userId) => {
    try {
      // Disable the button
      setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, userId]);

      // Update the user role as instructor in the backend API
      await axios.patch(`http://localhost:5000/users/instructor/${userId}`, { role: "instructor" }); // Replace with your API endpoint for updating user role

      // Update the user role in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            return { ...user, role: "instructor" };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error updating user role to instructor:", error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      // Disable the button
      setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, userId]);

      // Update the user role as admin in the backend API
      await axios.patch(`http://localhost:5000/users/admin/${userId}`, { role: "admin" }); // Replace with your API endpoint for updating user role

      // Update the user role in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === userId) {
            return { ...user, role: "admin" };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error updating user role to admin:", error);
    }
  };

  return (
    <div style={{ paddingTop: '90px' }}>
      <h1 className="mb-5 text-center">Manage Users</h1>
      <Container>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role !== "instructor" && (
                    <Button
                      variant="primary w-75"
                      onClick={() => makeInstructor(user._id)}
                      disabled={disabledButtons.includes(user._id)}

                    >
                      Make Instructor
                    </Button>
                  )}
                  {user.role !== "admin" && (
                    <Button
                      variant="info w-75"
                      onClick={() => makeAdmin(user._id)}
                      disabled={disabledButtons.includes(user._id)}
                    >
                      Make Admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManageUsers;
