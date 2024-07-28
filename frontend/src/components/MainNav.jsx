import { useSelector } from "react-redux";
import UsernameMenu from "./UsernameMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleUserRound, ShoppingCart } from "lucide-react";

const MainNav = () => {
  const user = useSelector((store) => store.user);
  const [openprofile, setopenprofile] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <>
      <span className="flex space-x-2 items-center">
        {user && user.email != "admin@gmail.com" ? (
          <>
            <Link to={"/cart"}>
              <ShoppingCart size={36} />
            </Link>
            {cartItems.length != 0 ? (
              <div className="absolute md:top-5 md:right-[74px] bg-orange-500 text-white w-6 h-6 flex justify-center items-center border-2  rounded-full">
                {cartItems.length}
              </div>
            ) : (
              ""
            )}
            <CircleUserRound
              onClick={() => setopenprofile((prev) => !prev)}
              size={36}
              className="cursor-pointer"
            />
          </>
        ) : (
          <CircleUserRound
            onClick={() => setopenprofile((prev) => !prev)}
            size={36}
            className="cursor-pointer"
          />
        )}

        {user && openprofile && <UsernameMenu />}
      </span>
    </>
  );
};

export default MainNav;
