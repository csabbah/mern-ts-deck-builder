import { Request, Response } from "express";
import User from "../../models/User";

import { API_URL } from "../../utils/config";
import { CLIENT_URL } from "../../utils/config";

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretsshhhhh";

export async function forgotPassword(req: Request, res: Response) {
  const email: string = req.body.email;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.send("User does not exist");
    }

    const secret = JWT_SECRET + userExists.password;
    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      secret,
      { expiresIn: "5m" }
    );

    // This link is for the frontend route (to be sent via email)
    const link = `${CLIENT_URL}/reset-password/${userExists._id}/${Math.floor(
      Math.random() * 10000000000000
    )}`;
    // This is to be used to update the password in the updatePassword fetch function
    const apiLink = `${API_URL}/reset-password/${userExists._id}/${token}`;

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "infocarlossab@gmail.com",
        pass: "ocszywoqukedfnka",
      },
    });

    var mailOptions = {
      from: "infocarlossab@gmail.com",
      to: email,
      subject: "Reset Password",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // Send the API link to be used for later
    res.json(apiLink);
  } catch (err) {}
}
