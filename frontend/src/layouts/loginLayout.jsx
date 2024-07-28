import React from "react";
import loginPageImg from "../assets/loginpage.jpg";

const LoginLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-around  ">
      <img
        src={loginPageImg}
        className="w-full lg:w-[40%] h-auto lg:h-screen my-12 mx-20 max-h-[500px] lg:max-h-none border rounded-xl object-cover"
        alt=""
      />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default LoginLayout;
