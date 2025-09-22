import { useEffect, useState } from "react";
import { db } from "../../../database/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FiMail, FiUser, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      setIsLoading(true);
      try {
        // Query the user with role = "admin"
        const q = query(collection(db, "users"), where("role", "==", "admin"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const adminDoc = querySnapshot.docs[0];
          setAdmin({ id: adminDoc.id, ...adminDoc.data() });
        } else {
          toast.error("No admin profile found", { autoClose: 3000 });
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        toast.error("Failed to load admin profile", { autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Loading Admin Profile...</h2>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        <p>No admin data available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Admin Profile</h2>

      {/* Avatar & Name */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
          {admin.fullName?.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{admin.fullName}</h3>
          <p className="text-gray-500">{admin.username}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FiMail className="text-gray-500 w-5 h-5" />
          <span className="text-gray-700">{admin.email}</span>
        </div>

        <div className="flex items-center space-x-3">
          <FiUser className="text-gray-500 w-5 h-5" />
          <span className="text-gray-700 capitalize">{admin.status}</span>
        </div>

        <div className="flex items-center space-x-3">
          <FiShield className="text-gray-500 w-5 h-5" />
          <span className="text-gray-700">Role: {admin.role}</span>
        </div>
      </div>

    
    </div>
  );
}
