import { Container, Table, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import useFetchSelectedClasses from "../../Shared/useFetchSelectedClasses ";
import useAxiosSecure from "../../Shared/useAxiosSecure";

const SelectedClasses = () => {
    const { selectedClasses, setSelectedClasses } = useFetchSelectedClasses();
    const [totalPrice, setTotalPrice] = useState(0);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        // Calculate the total price when the selected classes change
        const calculateTotalPrice = () => {
            const priceArray = selectedClasses.map((classData) => classData.price);
            const totalPrice = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [selectedClasses]);

    const handleDeleteClass = async (classId) => {
        try {
            // Delete the selected class from the backend API
            await axiosSecure.delete(`https://pixel-perfact-server.vercel.app/selectedClasses/${classId}`);

            // Remove the deleted class from the local state
            setSelectedClasses((prevSelectedClasses) =>
                prevSelectedClasses.filter((classData) => classData._id !== classId)
            );
        } catch (error) {
            console.error("Error deleting selected class:", error);
        }
    };

    return (
        <div className="" style={{ marginBottom: "-48px", paddingBottom: "200px" }}>
            <h1 className="text-center fw-semibold text-white" style={{ paddingTop: "30px", paddingBottom: "50px" }}>
                My Selected Classes
            </h1>
            <Container>
                <p className="text-center">Total Price: ${totalPrice}</p>
                <div className="text-center mb-3">
                    <Link to="/dashboard/payment">
                        <Button variant="outline-primary">Pay</Button>
                    </Link>
                </div>
                {selectedClasses.length === 0 ? (
                    <p className="text-center text-white">You haven&#39;t booked any classes yet.</p>
                ) : (
                    <>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Class Image</th>
                                    <th>Class Name</th>
                                    <th>Instructor</th>
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedClasses.map((classData) => (
                                    <tr key={classData._id}>
                                        <td>
                                            <img className="rounded-circle" src={classData.image} alt={classData.name} width="90" />
                                        </td>
                                        <td>{classData.name}</td>
                                        <td>{classData.instructorName}</td>
                                        <td>{classData.classTimePeriod}</td>
                                        <td>${classData.price}</td>

                                        <td>
                                            <Button variant="outline-danger" className="mr-2" onClick={() => handleDeleteClass(classData._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </>
                )}
            </Container>
        </div>
    );
};

export default SelectedClasses;
