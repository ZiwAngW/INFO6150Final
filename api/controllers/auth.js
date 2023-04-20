import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { promisify } from 'util';

export const register = async (req, res, next) => {
  try {
    console.log("here");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    console.log("here1");
    await newUser.save();
    console.log("here2");
    res.status(200).send("User has been created.");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    console.log("setting cookie");
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({ details: { ...otherDetails }, isAdmin });
    console.log("cookie set");
  } catch (err) {
    next(err);
  }
};


// Middleware function for JWT authentication using cookies
const authenticateWithJwtCookie = async (req, res, next) => {
  try {
    const jwtCookie = req.cookies.access_token; // Assuming the cookie name is 'access_token'
    if (!jwtCookie) {
      // Handle case when cookie is not present
      console.log("no cookie");
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedJwt = await promisify(jwt.verify)(jwtCookie, process.env.JWT); // Assuming you have a JWT_SECRET environment variable for JWT secret
    req.user = decodedJwt; // Attach decoded JWT payload to request object for future use
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    // Handle JWT verification errors
    console.log(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
export { authenticateWithJwtCookie };