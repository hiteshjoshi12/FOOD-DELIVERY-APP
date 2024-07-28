import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./CartSlice"



const appStore = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
    },
})


export {appStore};