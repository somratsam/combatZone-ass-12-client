import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useEffect, useState } from "react";


const useAdmin = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosSecure.get(`/users/admin/${user.email}`);
        setIsAdmin(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    if (user?.email) {
      fetchAdminData();
    }
  }, [axiosSecure, user]);

  return isAdmin;
};

export default useAdmin;