import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Edit() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // User yang sedang diedit
  const [formData, setFormData] = useState({}); // Data form untuk edit
  const [searchTerm, setSearchTerm] = useState(""); // Untuk pencarian
  const token = localStorage.getItem("authToken");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Kosongkan untuk keamanan
      profilePicture: user.profilePicture,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User updated successfully!");
        setEditingUser(null); // Tutup form edit
        fetchUsers(); // Refresh data
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers(); // Refresh data
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users berdasarkan pencarian
  const filteredUsers = users.filter((user) => {
    return (
      user._id.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <Navbar />
      <div className="w-64 h-10  m-5">
        <div className="border border-black flex h-full items-center px-2 gap-2">
          <input
            type="text"
            placeholder="Search by ID, Email, or Name"
            className="outline-none w-11/12"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="w-full p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Id</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 text-center">
                  <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-blue-500 mr-2" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button className="text-red-500" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingUser && (
          <div className="mt-5">
            <h2>Edit User</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="border px-4 py-2"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
              Save
            </button>
            <button onClick={() => setEditingUser(null)} className="bg-red-500 text-white px-4 py-2">
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
