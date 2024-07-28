import React from "react";
import Hero from "../components/Hero";

const Layout = ({ children, hero = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {hero && <Hero />}
      <div className="container mx-auto flex-1 my-6">{children}</div>
    </div>
  );
};

export default Layout;
