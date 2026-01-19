import { fetchUserProfile } from "../services/profile.service.js";


const getProfile = async(req,res)=>{
    try{
        const user = await fetchUserProfile(req.user.id);
        res.status(200).json({user});
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

export {getProfile};