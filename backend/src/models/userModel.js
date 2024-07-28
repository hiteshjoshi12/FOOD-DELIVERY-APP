import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firebaseUid: String,
  displayName: String,
  email: String,
  address: String,
  city: String,
  country: String,
  
  
});


const User = mongoose.model("User", userSchema);

export { User };
