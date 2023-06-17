// import ThemeToggle from "../../ThemeToggle ";
import Banner from "../Banner";
import ClientsFeedback from "./clientReview/ClientsFeedback";

import PopularInstructors from "./instructors/PopularInstructors ";
import PopularClasses from "./populerClasses/PopularClasses";

const Home = () => {
    return (
        <div>
            
           <Banner></Banner>
           {/* <ThemeToggle></ThemeToggle> */}
           <PopularClasses></PopularClasses>
           <ClientsFeedback></ClientsFeedback>
           <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;