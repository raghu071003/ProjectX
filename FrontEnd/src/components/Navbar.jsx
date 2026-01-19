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
    <nav className="w-full border-b border-gray-700 bg-gray-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/dashboard" className="font-bold text-xl text-white flex items-center gap-2 hover:text-indigo-400 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          SkillForge
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};


