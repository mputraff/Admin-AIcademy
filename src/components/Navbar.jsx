import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navbar({ isLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        console.log("Logout berhasil!");
        navigate("/");
    };

    return (
        <header className="w-full h-14 bg-slate-600">
            <nav className="flex items-center justify-between h-full px-5">
                <Link to="/"><h3 className="text-white text-lg">AIcademy</h3></Link>
                {isLoggedIn && ( // Tampilkan menu jika isLoggedIn === true
                    <ul className="flex gap-5 text-white">
                        <Link to="/home"><li>Home</li></Link>
                        <Link to="/edit"><li>Edit</li></Link>
                        <li className="cursor-pointer" onClick={handleLogout}>Logout</li>
                    </ul>
                )}
                <div className="w-8 h-8 bg-black rounded-full"></div>
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn harus berupa boolean dan wajib diisi
};