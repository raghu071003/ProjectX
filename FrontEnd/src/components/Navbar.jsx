import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Brand */}
        <Link to="/dashboard" className="font-bold text-lg">
          SkillForge
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 border rounded hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-black"
              >
                Dashboard
              </Link>

              <Link
                to="/solve"
                className="text-gray-700 hover:text-black"
              >
                Solve
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 border rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
