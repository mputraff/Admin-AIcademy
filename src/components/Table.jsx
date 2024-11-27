
import  { useState, useEffect } from 'react'

export default function Table() {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("authToken");

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://aicademy-api-573404438653.asia-southeast2.run.app/api/auth/users", {
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
        <div className="w-full p-5">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Id</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Password</th>
                            <th className="border border-gray-300 px-4 py-2">Profile Picture</th>
                            <th className="border border-gray-300 px-4 py-2">Otp</th>
                            <th className="border border-gray-300 px-4 py-2">Otp Expires</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.profilePicture}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.otp}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.otpExpires}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(user.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}