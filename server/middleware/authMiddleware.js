import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const auth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default auth; 
