import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useEffect, useState } from "react";


const useStudent = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axiosSecure.get(`/users/student/${user.email}`);
        setIsStudent(response.data.student);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (user?.email) {
        fetchStudentData();
    }
  }, [axiosSecure, user]);

  return isStudent;
};

export default useStudent;
