import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoutes from "./ProtectedRoutes";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import GoogleSuccess from "./pages/auth/GoogleSuccess";
import PageLoading from "./components/PageLoading";

function App() {
  const [user, setUser] = useState<null | Object>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken?.exp && decodedToken?.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setUser(decodedToken);
      }
    }
    setLoading(false);
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        {user && !loading ? (
          ProtectedRoutes()
        ) : (
          <Route path="*" element={<Login />} />
        )}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google/success" element={<GoogleSuccess />} />

        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
