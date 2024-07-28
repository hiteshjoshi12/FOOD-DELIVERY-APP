import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import {appStore} from "./Utils/appStore";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  
    <Provider store={appStore}>
      <Router>
        <Header />
        <AppRouter />
        <Toaster visibleToasts={1} duration={2000} position="bottom-right" richColors/>
        <Footer />
      </Router>
    </Provider>
 
);
