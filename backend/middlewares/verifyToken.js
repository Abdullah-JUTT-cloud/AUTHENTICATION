import jwt from 'jsonwebtoken';

export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    try {
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.userId=decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}