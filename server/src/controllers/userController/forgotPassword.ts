import { Request, Response } from "express";
import User from "../../models/User";

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

    // Remove the periods from the token (temporarily) so we can load the route path
    // '.' are treated as file extensions so they don't work with react router
    const updatedToken = token.replace(/\./g, "encrypted24492024");
    const link = `csflashdeckcards.com/reset-password/${userExists._id}/${updatedToken}`;

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "infocarlossab@gmail.com",
        pass: "cntnyukswdocjwfs",
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
  } catch (err) {}
}
