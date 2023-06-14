import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import useAxiosSecure from "../../../Shared/useAxiosSecure";


const CheckOut = ({price}) => {
    const stripe = useStripe()

    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')


    useEffect(() => {
axiosSecure.post('/create-payment-intent', {price})
.then(res =>{
    console.log(res.data.clientSecret);
    setClientSecret(res.data.clientSecret)
})
    }, [axiosSecure, price])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null)
            return





        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
    }

    return (
        <Container className="w-75">
            <form onSubmit={handleSubmit}>
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
                <Button variant="success" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </Button>
            </form>
            {cardError && <p className="text-danger">{cardError}</p>}
        </Container>
    );
};

export default CheckOut;