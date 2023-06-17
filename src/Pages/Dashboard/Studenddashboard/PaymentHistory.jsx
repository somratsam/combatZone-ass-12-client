import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Shared/useAxiosSecure';
import useAuth from '../../Shared/useAuth';
import { Table } from 'react-bootstrap';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        if (!user || !user.email) {
          return;
        }

        const response = await axiosSecure.get('/paymentHistory', {
          params: {
            email: user.email,
          },
        });

        setPaymentHistory(response.data);
      } catch (error) {
        console.log('Failed to fetch payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, [axiosSecure, user]);

  return (
    <div style={{paddingTop: '100px', paddingBottom: '30px'}}>
      <h1>Payment History</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Date</th>
            {/* Add additional table headers for other payment properties */}
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.transactionId}</td>
              <td>{payment.price}$</td>
              <td>{payment.quantity}</td>
              <td>{payment.date}</td>
              {/* Add additional table cells for other payment properties */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
