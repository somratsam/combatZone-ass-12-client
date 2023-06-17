import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Shared/useAxiosSecure';
import useAuth from '../../Shared/useAuth';
import Table from 'react-bootstrap/Table';

const EnrolledClasses = () => {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                if (!user || !user.email) {
                    return;
                }

                const response = await axiosSecure.get('/enrolledClasses', {
                    params: {
                        email: user.email,
                    },
                });

                setEnrolledClasses(response.data);
            } catch (error) {
                console.log('Failed to fetch enrolled classes:', error);
            }
        };

        fetchEnrolledClasses();
    }, [axiosSecure, user]);

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '30px' }}>
            <h1>Enrolled Classes</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledClasses.map((classData) => (
                        <tr key={classData._id}>
                            <td>
                                <img className="rounded-circle" src={classData.classImage} alt={classData.name} width="90" />
                            </td>
                            <td>{classData.className}</td>
                            <td>{classData.instructorName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EnrolledClasses;
