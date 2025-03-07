import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StoresPage from "./pages/StoresPage";
import SKUsPage from "./pages/SKUsPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hookss/AuthContext";

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <Router>
      <div className="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 flex flex-col m-[20px]">
            <Routes>
              <Route
                path="/login"
                element={user ? <StoresPage /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <StoresPage /> : <Register />}
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<StoresPage />} />
                <Route path="/skus" element={<SKUsPage />} />
                <Route path="/planning" element={<PlanningPage />} />
                <Route path="/chart" element={<ChartPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>

      <Toaster />
    </Router>
  );
};

export default App;
