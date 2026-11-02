import {Navigate, Route, Routes} from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLoginPage from "./admin/AdminLoginPage";
import AuthPage from "./pages/AuthPage";
const AdminProtectedRoute = ({children}) => {
  const hasAdminToken = !!localStorage.getItem("adminToken");
  if (!hasAdminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

const PublicOnlyRoute = ({children}) => {
  const hasToken = Boolean(localStorage.getItem('token'));

  if(hasToken) {
    return <Navigate to="/" replace />
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicOnlyRoute><AuthPage /></PublicOnlyRoute>} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>}
    />
    </Routes> 
  )
}