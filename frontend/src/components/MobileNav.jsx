import { Menu, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/Firebase";

const MobileNav = () => {
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.items);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <>
      

      <Sheet>
      {cartItems.length != 0 ? (
        <div className=" absolute top-[10px] right-[69px] z-10 bg-orange-500 text-white w-6 h-6 flex justify-center items-center border-2  rounded-full">
          {cartItems.length}
        </div>
      ) : (
        ""
      )}
      <Link to={"/cart"}>
        <ShoppingCart size={36} className="absolute right-[70px] top-[20px]" />
      </Link>

        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent className=" space-y-3">
          <SheetTitle>
            <p className="font-bold">Welcome to LeastEat.com</p>
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex flex-col gap-5 mt-2">
            {user && (
              <>
                <span className="text-xl font-semibold tracking-wide hover:text-orange-500">
                  Welcome, {user?.displayName}
                </span>
                {/* <Link
                to={"/user-profile"}
                className="text-xl hover:text-orange-500"
                >
                User Profile
              </Link> */}
              </>
            )}
            <Button
              onClick={handleSignout}
              variant="link"
              className="flex-1 font-bold bg-orange-500"
            >
              {user ? "Sign Out" : "Log in "}
            </Button>
          </SheetDescription>
        </SheetContent>
        
      </Sheet>
      
    </>

  );
};

export default MobileNav;
