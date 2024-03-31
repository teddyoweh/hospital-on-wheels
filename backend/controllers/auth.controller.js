const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function registerController(req, res) {
    const { email, password, firstname, lastname } = req.body;
    
    const errors = {};

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            errors.email = "Email already exists";
        }
    } catch (err) {
        errors.email = "Error checking existing user";
    }

    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Invalid email format";
    }
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }
    if (!firstname.trim()) {
        errors.firstname = "Firstname is required";
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(firstname)) {
        errors.firstname = "Firstname must contain only letters and may include characters like ', . -";
    }
    if (!lastname.trim()) {
        errors.lastname = "Lastname is required";
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(lastname)) {
        errors.lastname = "Lastname must contain only letters and may include characters like ', . -";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        await user.save();
        const payload = {
            
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            uimg: user.uimg

        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(201).json({ message: 'User created successfully',token, user: payload});
    } catch (err) {
        return res.status(500).json({ error: 'Could not create user' });
    }
}
  

 

async function loginController(req, res) {
    const { email, password } = req.body;
    const errors = {};

    if (!email.trim()) {
        errors.email = "Email is required";
    }
    if (!password) {
        errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const payload = {
            
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            uimg: user.uimg

        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(201).json({ message: 'User created successfully',token, user: payload});
    } catch (err) {
        return res.status(500).json({ error: 'Could not login' });
    }
}

async function verifyAuthController(req,res){
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
}


module.exports  = {
    registerController,
    verifyAuthController,
    loginController
}