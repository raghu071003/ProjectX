import User from "../models/User.js";


const fetchUserProfile = async(userId)=>{
  try{
      const user = await User.findById(userId).select('-password');
        return user;
  }catch(err){
      throw new Error("Error fetching user profile");
  }

}

export {fetchUserProfile};