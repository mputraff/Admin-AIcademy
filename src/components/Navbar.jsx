import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <header className="w-full h-14 bg-slate-600">
                <nav className="flex items-center justify-between h-full px-5">
                    <Link to="/"><h3 className="text-white text-lg">AIcademy</h3></Link>
                    <ul className="flex gap-5 text-white">
                    <Link to="/home"><li>Home</li></Link>
                        <Link to="/edit"><li>Edit</li></Link>
                    </ul>
                    <div className="w-8 h-8 bg-black rounded-full">

                    </div>
                </nav>
            </header>
        </>
    )
}