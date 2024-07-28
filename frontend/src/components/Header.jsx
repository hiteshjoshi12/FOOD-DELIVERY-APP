import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "@/Utils/userSlice";
import { auth } from "@/Firebase/Firebase";
import { useEffect } from "react";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        if (user.email == "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="border-b-2 py-6 ">
      <div className="mx-8 flex justify-between items-center">
        {user ? (
          user.email === "admin@gmail.com" ? (
            <Link to={"/admin"}>
              <p className="text-3xl font-bold tracking-tight text-orange-500">
                Welcome Admin!
              </p>
            </Link>
          ) : (
            <Link to={"/home"}>
              <p className="text-3xl font-bold tracking-tight text-orange-500">
                Let's Eat
              </p>
            </Link>
          )
        ) : (
          <Link to={"/login"}>
            <p className="text-3xl font-bold tracking-tight text-orange-500">
              Let's Eat
            </p>
          </Link>
        )}

        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
