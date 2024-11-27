import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Edit() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // User yang sedang diedit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); // Data form untuk edit
  const [searchTerm, setSearchTerm] = useState(""); // Untuk pencarian
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const token = localStorage.getItem("authToken");

  // Fetch users dari API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Hapus user dari state setelah berhasil
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Handle pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle perubahan data form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle ketika tombol edit ditekan
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "", // Kosongkan password, hanya diubah jika diperlukan
    });
  };

  // Handle submit form edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users/${editingUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Handle batal edit
  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "" });
  };

  // Load data user saat pertama kali render
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Users</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-4 w-full"
        />

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Profile Picture</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={`${user.name}'s profile`}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="border p-2 text-center">{user.name}</td>
                    <td className="border p-2 text-center">{user.email}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {editingUser && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">
              Editing {editingUser.name}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded mr-2"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
