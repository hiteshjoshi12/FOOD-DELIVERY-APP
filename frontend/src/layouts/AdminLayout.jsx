import React from "react";
import adminimg from "../assets/admin.jpg"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
       <img src={adminimg} className="w-full max-h-[600px] object-cover my-4  p-5 rounded-[40px] " />
      <div className="container mx-auto flex-1 py-10">{children}</div>
    </div>
  );
};

export default Layout;
