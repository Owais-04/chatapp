//token gernerations
import jwt from 'jsonwebtoken';


//function to generate JWT token
export const generateToken=(userId)=>{
    const token=jwt.sign({id: userId}, process.env.JWT);
    return token;
}