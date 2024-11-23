import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(
                "https://aicademy-production.up.railway.app/api/auth/login",
                { email, password }
            );
            const token = response.data.token;
            const isAdmin = response.data.message.includes("Admin"); // Cek pesan dari backend
            localStorage.setItem("authToken", token);
            console.log(isAdmin ? "Login admin berhasil!" : "Login user berhasil!");
            navigate("/home");
            setErrorMessage(""); // Hapus pesan error jika berhasil
        } catch (error) {
            console.log("Login gagal:", error);
            const errorMsg = error.response?.data?.message || "Login gagal!";
            setErrorMessage(errorMsg);
        }
    };

    return (
        <>
            {/* Navbar tanpa menu tambahan */}
            <Navbar isLoggedIn={false} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.email.value;
                            const password = e.target.password.value;
                            handleLogin(email, password);
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Login sebagai admin
                    </p>
                </div>
            </div>
        </>
    );
}