import React, { useState } from "react";
import { CreditCard, Mail } from "lucide-react";
import { Button } from "./ui/button";
import OrderConfermation from "./OrderConfermation";
import { useSelector } from "react-redux";
import { selectRestaurantName, selectCartItems } from "../Utils/CartSlice"; // Import missing functions
import axios from "axios";
import { toast } from "sonner";

const OrderSummary = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const restaurantName = useSelector(selectRestaurantName);
  const products = useSelector(selectCartItems);
  const cartItems = useSelector((store) => store.cart.items);
  const totalitem = cartItems.length;
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handlePlaceOrder = async () => {
    if (!email || !address || !cardHolder || !cardNumber || !expiryDate || !cvc || !city || !zip) {
      toast.error("Please fill in all the required fields.");
      return;
    }

  
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      toast.error("Please enter a valid card number.");
      return;
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
      toast.error("Please enter a valid expiry date in MM/YY format.");
      return;
    }
    
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(cvc)) {
      toast.error("Please enter a valid cvc.");
      return;
    }

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(zip)) {
      toast.error("Please enter a valid zip code.");
      return;
    }

    try {
      // Prepare order data
      const orderData = {
        restaurantName: restaurantName,
        items: products.map(product => ({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        })),
        totalAmount: calculateTotal(),
        customerEmail: email,
        billingAddress: address,
      };

      await axios.post('http://localhost:3001/api/orders', orderData);
      setShowConfirmation(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Schedule page reload after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  const calculateTotal = () => {
    const total = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return parseFloat(total.toFixed(2));
  };

  return (
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      {showConfirmation && <OrderConfermation />}
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <form className="">
        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <Mail />
          </div>
        </div>
        <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
          Card Holder
        </label>
        <div className="relative">
          <input
            type="text"
            id="card-holder"
            name="card-holder"
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your full name here"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <CreditCard />
          </div>
        </div>
        <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
          Card Details
        </label>
        <div className="flex">
          <div className="relative w-7/12 flex-shrink-0">
            <input
              type="text"
              id="card-no"
              name="card-no"
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <CreditCard />
            </div>
          </div>
          <input
            type="text"
            name="credit-expiry"
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
          />
          <input
            type="password"
            name="credit-cvc"
            onChange={(e) => setCvc(e.target.value)}
            className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="CVC"
          />
        </div>
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input
              type="text"
              id="billing-address"
              onChange={(e) => setAddress(e.target.value)}
              name="billing-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street Address"
            />
          </div>
          <input
            type="text"
            name="billing-state"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          ></input>
          <input
            type="text"
            name="billing-zip"
            onChange={(e) => setZip(e.target.value)}
            className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="ZIP"
          />
        </div>
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">₹{calculateTotal()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              Price ({totalitem} items)
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">Free</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">₹{calculateTotal()}</p>
        </div>
        <Button type="button" onClick={handlePlaceOrder} className="mt-4 mb-8 w-full rounded-md bg-orange-500 px-6 py-3 font-medium text-black">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default OrderSummary;
