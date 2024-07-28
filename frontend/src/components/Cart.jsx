import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
} from "../Utils/CartSlice";
import { Button } from "./ui/button";

import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";


const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <div className="w-full">
      {products.length != 0 ? (
        <div className="p-3">
          <p className="text-3xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items before placing order.
          </p>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-3xl font-medium">
            Your Cart is Empty. Please order something.
          </p>
          <Link to="/home" className='ml-1 text-sm font-semibold underline cursor-pointer text-blue-500'>Back to home</Link>
        </div>
      )}

      {products.map((product, index) => (
        <div key={index} className=" my-3">
          <div className="flex md:flex-row md:justify-start md:ml-4 w-full flex-col items-center justify-center ">
            <img
              src={product.img}
              alt={product.name}
              className="flex-1 md:flex-none aspect-[1/.5] md:w-48 w-72 object-cover rounded-xl"
            />

            <h3 className="text-3xl md:text-start text-center mt-3 md:ml-3 tracking-wider md:w-[25rem] font-mono text-black ">
              {product.name}
            </h3>
            <p className="md:w-20 text-2xl tracking-wider font-mono text-gray-900">
              ₹{product.price}
            </p>

            <div className="flex items-center justify-center shadow-xl border-2 border-black">
              <Button
                type="button"
                onClick={() => handleDecreaseQuantity(product._id)}
                className=" w-4 h-8 text-2xl border-r-2 border-black  "
              >
                -
              </Button>
              <input
                type="text"
                className="mx-2 h-7 w-9 text-center  rounded-md"
                value={product.quantity}
                readOnly
              />
              <Button
                type="button"
                onClick={() => handleIncreaseQuantity(product._id)}
                className="w-4 h-8 text-2xl border-l-2 border-black"
              >
                +
              </Button>
            </div>
            <div className=" md:ml-2">
              <Button
                type="button"
                onClick={() => handleRemoveFromCart(product._id)}
                className="text-xs rounded-xl md:mt-0 mt-2 font-medium bg-orange-500 w-full"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* order summary  */}
      {products.length != 0 ? <OrderSummary /> : ""}
    </div>
  );
};

export default Cart;
