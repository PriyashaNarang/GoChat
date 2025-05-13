import jwt from "jsonwebtoken"
const createtokenandsavecookie=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_TOKEN,{
        expiresIn: "10d"
    });
    res.cookie("jwt",token,{
        // saves from xss
        httpOnly: true, 
        secure: true,
        // saves from csrf
        sameSite: "strict" 
    });
};
export default createtokenandsavecookie;