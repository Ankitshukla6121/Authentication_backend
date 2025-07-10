import jwt from 'jsonwebtoken'

const authMiddleware= (req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"No token, authorization failed"
        })
    }
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            message:"Token is not valid"
        })
    }
}


export default authMiddleware;