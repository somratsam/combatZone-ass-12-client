import { useState, useEffect} from "react";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFetchSelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  const { user, loading } = useAuth(); 
  const [axiosSecure] = useAxiosSecure();
  

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      try {
        const response = await axiosSecure.get(`/selectedClasses?email=${user?.email}`);

        const data = response.data;
        setSelectedClasses(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching selected classes:", error);
      }
    };
  
    if (user && !loading) {
      fetchSelectedClasses();
    }
  }, [user, axiosSecure, loading]);
  

  // Include setSelectedClasses in the return value
  return { selectedClasses, setSelectedClasses };
};

export default useFetchSelectedClasses;
