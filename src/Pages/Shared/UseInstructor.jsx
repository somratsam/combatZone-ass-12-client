import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useEffect, useState } from "react";


const useInstructor = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axiosSecure.get(`/users/instructor/${user.email}`);
        setIsInstructor(response.data.instructor);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    if (user?.email) {
        fetchInstructorData();
    }
  }, [axiosSecure, user]);

  return isInstructor;
};

export default useInstructor;