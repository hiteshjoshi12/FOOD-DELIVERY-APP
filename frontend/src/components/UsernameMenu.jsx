import React from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/Firebase";

const UsernameMenu = () => {
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="felx flex-col dropdown-profile z-10">
      <ul className="flex flex-col gap-4">
        <li className="font-bold text-xl uppercase">{user.displayName}</li>
        {user.email != "admin@gmail.com" ? (
          ""
        ) : (
          ""
        )}
        <li>
          <button
            onClick={handleSignout}
            variant="ghost"
            className="text-xl font-semibold tracking-wide"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UsernameMenu;
