import { useState, useEffect } from "react";

export default function Table() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("authToken");
    const baseURL = "https://aicademy-api-573404438653.asia-southeast2.run.app";

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/api/auth/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("Fetched users:", data); // Debugging: cek data dari API
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Menambahkan dependency array agar tidak memanggil ulang tanpa perubahan

    return (
        <>
            <div className="w-full p-5">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Id</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Profile Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td>
                                        {user.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={`${user.name}'s profile`}
                                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                            />
                                        ) : (
                                            "No Picture"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
