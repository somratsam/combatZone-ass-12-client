import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import useFetchSelectedClasses from "../../../Shared/useFetchSelectedClasses ";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { selectedClasses } = useFetchSelectedClasses();
  const totalPrice = selectedClasses.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(totalPrice.toFixed(2));

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOut selectedClasses = {selectedClasses} price={price}></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;
