import jwt from "jsonwebtoken"
import user from "../models/user.model.js"
const secureroute=async (req,res,next)=>{
    try
    {
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({message:"Unauthorised user"});
        }
        const verified=jwt.verify(token,process.env.JWT_TOKEN);
        if(!verified)
        {
            return res.status(403).json({message:"Invalid user"});
        }
        const requser=await user.findById(verified.userid).select("-password");
        if(!requser)
        {
            return res.status(404).json({message:"User not found"})
        }
        req.user=requser;
        next();
    }
    catch(err)
    {
        console.log(err);
        return res.status(501).json({message:"Internal server error"})
    }
}
export default secureroute;