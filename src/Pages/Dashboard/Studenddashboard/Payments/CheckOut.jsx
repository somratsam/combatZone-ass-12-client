import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import useAxiosSecure from "../../../Shared/useAxiosSecure";
import useAuth from "../../../Shared/useAuth";
import "./CheckOut.css"; // Import custom CSS file for styling

const CheckOut = ({ price, selectedClasses }) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if(price > 0){
        axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
    } else {
      setCardError('');
      console.log('[PaymentMethod]', paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous',
          },
        },
      },
    );

    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: selectedClasses.length,
        cartsItems: selectedClasses.map(item => item._id),
        classItems: selectedClasses.map(item => item.classId),
        status: 'service pending',
        item: selectedClasses.map(item => item.name),
      };

      axiosSecure.post('/payments', payment)
        .then(res => {
          console.log(res.data);
          if (res.data.result.insertedId) {
            // Handle success
          }
        });
    }
  };

  return (
    <Container className="w-75">
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <Button
          variant="success"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="pay-button"
        >
          {processing ? 'Processing...' : 'Pay'}
        </Button>
      </form>
      {cardError && <p className="error-message">{cardError}</p>}
      {transactionId && (
        <p className="success-message">
          Transaction Success <br />
          TransactionId: {transactionId}
        </p>
      )}
    </Container>
  );
};

export default CheckOut;
