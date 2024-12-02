
import { useState, useEffect } from 'react'

export default function Table() {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("authToken");
    const baseURL = "http://localhost:8080";

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/api/auth/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUsers(data); // Simpan data ke state
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    })

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
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.profilePicture ? (
                                            <img
                                                src={`${baseURL}${user.profilePicture}`}
                                                
                                                className="w-16 h-16 object-cover rounded"
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
            ;
        </>
    );
}