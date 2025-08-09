import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
//signup new user
export const signup = async (req, res) => {
    const {fullname,email,password,bio}=req.body;
    try {
        if(!fullname || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
            }
        }
        const user =await User.findOne({email});
        if(user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser =  await User.create({
            fullName: fullname,
            email,
            password: hashedPassword,
            bio
        });
    
        const token =generateToken(newUser._id);
        res.json({success:true,userData: newUser,token,message:"Accouont creatd successfully"});
        

res.json({success:true,message: 'Signup successful', user: newUser, token});
    }catch (error) {
        console.error('Error during signup:', error);
        res.json({success:false,message: error.message});
    }

}

//controller for user login
export const login =async (req, res) => {
    try {
        const{email,password}=req.body;
        const userData=await User.findOne({email});

        const isPasswordValid = userData && await bcrypt.compare(password, userData.password);
        if(!isPasswordValid) {
            return res.json({success:false,message: 'Invalid email or password'});
        }
          const token =generateToken(newUser._id);
        res.json({success:true,userData: newUser,token,message:"Accouont creatd successfully"});
        

        res.json({success:true,message: 'Login successful', user: userData});
    }catch (error) {
        console.error('Error during login:', error);
        res.json({success:false,message: 'Internal server error'});
    }
}

//controller to update user porfile 
export const updateProfile=async (req, res) => {
    try {
        const {fullName, bio, profilePic} = req.body;
        const userId = req.user._id;

       let updatedUser;
       if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
       } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, {
                bio, fullName, profilePic: upload.secure_url
            }, { new: true });
       }

       res.json({ success: true, message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }