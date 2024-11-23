import Table from "../components/Table";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            
            <Navbar isLoggedIn={true} />
            <Table />
        </>
    );
}