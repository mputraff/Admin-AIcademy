import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/edit/" element={<EditUser />} />
      </Routes>
    </Router>

    
  );
};

export default App;