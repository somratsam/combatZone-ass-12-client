import { Container } from "react-bootstrap";
import "../Shared/Style.css";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import useAdmin from "../Shared/UseAdmin";
import useInstructor from "../Shared/UseInstructor";

const Classes = () => {
    const { user } = useContext(AuthContext);

    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = useAdmin();
    const isInstructor = useInstructor()


    useEffect(() => {
        // Fetch approved class data from MongoDB
        const fetchApprovedClasses = async () => {
            try {
                const response = await fetch("https://pixel-perfact-server.vercel.app/approveClasses");
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error("Error fetching approved classes:", error);
            }
        };

        fetchApprovedClasses();
    }, []);

    const handleAddToCart = async (classData) => {
        if (!user) {
            // User is not logged in, show a confirmation dialog
            Swal.fire({
                icon: "warning",
                title: "You need to log in first",
                showCancelButton: true,
                confirmButtonText: "OK",
                showLoaderOnConfirm: true,
                preConfirm: (choice) => {
                    if (choice) {
                        // User clicked "OK", navigate to the login page
                        navigate("/login", { state: { from: location.pathname } });
                    }
                },
            });
            return;
        }

        if (
            classData.availableSeats === 0 ||
            (isAdmin || isInstructor)) {
            // Disable the select button
            return;
        }
       
        try {
            const cartItem = {
                classId: classData._id,
                name: classData.className,
                instructorName: classData.instructorName,
                classTimePeriod: classData.classTimePeriod,
                image: classData.classImage,
                price: classData.price,
                email: user.email,

            };

            // Send the cart item data to the backend API
            const response = await axios.post(
                "https://pixel-perfact-server.vercel.app/carts",
                cartItem
            );
            console.log(response.data); // You can handle the response here
            Swal.fire({
                icon: "success",
                title: "Class added to cart successfully",
              });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    return (
        <div
            className="style"
            style={{ marginBottom: "-48px", paddingBottom: "200px" }}
        >
            <h1
                className="text-center fw-semibold text-white "
                style={{ paddingTop: "130px", paddingBottom: "50px" }}
            >
                CLASSES
            </h1>
            <Container>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {classes.map((classData) => (
                        <div
                            key={classData._id}
                            className={`col ${classData.availableSeats === 0 ? "bg-danger" : ""
                                }`}
                        >
                            <div className="card h-100 border-0">
                                <img
                                    src={classData.classImage}
                                    className="card-img-top"
                                    alt={classData.name}
                                />
                                <div
                                    className="card-body text-white text-center"
                                    style={{ backgroundColor: "#13182a" }}
                                >
                                    <h5 className="card-title">{classData.className}</h5>
                                    <h5 className="card-title">
                                        Instructor: {classData.instructorName}
                                    </h5>
                                    <p className="card-text text-danger">
                                        Time: {classData.classTimePeriod}
                                    </p>
                                    <h5 className="card-title">
                                        Available Seats: {classData.availableSeats}
                                    </h5>
                                    <h5 className="card-title">Price: ${classData.price}</h5>

                                    <Button
                                        variant="outline-danger my-3 text-white border-0 border-bottom"
                                        onClick={() => handleAddToCart(classData)}
                                        disabled={
                                            classData.availableSeats === 0 ||
                                            (isAdmin || isInstructor)
                                        }
                                    >
                                        Select
                                    </Button>



                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Classes;
