const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

//gen jwt

const generateToken = (userId) => {

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

//register user

const registerUser = async (req, res) => {

    try{
        const { name, email, password, profileImageUrl } = req.body;

        //check if user exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        //return user data and token

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

//login user


const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });



    }
        //return user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

}
        catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        }



};

//get user profile

const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    }
        catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};






