import {useState, useEffect, useRef} from "react";
import {User, Settings, ChevronDown, LogOut} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx"; // Import the custom auth hook

const Profile = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {logout, user} = useAuth(); // Use the custom auth hook
    const navigate = useNavigate(); // For navigation after logout

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSectionClick = () => setDropdownOpen(false);

    const handleLogout = () => {
        logout(); // Use the custom logout function
        setDropdownOpen(false);
        navigate('/login'); // Redirect to login page after logout
    };

    // Display name from user context or fallback to default
    const displayName = user?.name || "Classroom User";
    // Get first letter of name for avatar
    const avatarLetter = displayName.charAt(0).toUpperCase();
    // User role
    const userRole = user?.role || "Classroom User";

    return (
        <div className="relative flex items-center gap-2 p-4 z-10" ref={dropdownRef}>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                <span>{avatarLetter}</span>
            </div>
            <div>
                <div className="font-medium text-lg">{displayName}</div>
                <div className="text-sm">{userRole}</div>
            </div>
            <div className="ml-2 cursor-pointer" onClick={toggleDropdown}>
                <ChevronDown className="w-5 h-5 text-stone-600 dark:text-gray-400"/>
            </div>
            {dropdownOpen && (
                <div
                    className="absolute p-2 rounded-lg shadow-lg w-48 bg-white text-stone-700 border border-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-700"
                >
                    <div
                        className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={handleSectionClick}
                    >
                        <Settings className="w-5 h-5 text-stone-600 dark:text-gray-400"/>
                        <div className="text-sm">Settings</div>
                    </div>
                    <Link to="/profile">
                        <div
                            className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={handleSectionClick}
                        >
                            <User className="w-5 h-5 text-stone-600 dark:text-gray-400"/>
                            <div className="text-sm">Profile</div>
                        </div>
                    </Link>
                    <div
                        className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5 text-stone-600 dark:text-gray-400"/>
                        <div className="text-sm">Logout</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;