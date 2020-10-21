import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import * as jsonwebtoken from "jsonwebtoken";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = _req;

    await dbConnect();

    switch (method) {
      case "POST":
        console.log(method);
        try {
          const { email, password } = _req.body;
          const user: any = await User.findOne({ email });
          console.log("Grabbed user.");
          if (!user) {
            res.status(404).send({ email: "Email is not registered." });
          }
          const match = await argon2.verify(user.password, password);
          console.log("ran match.");
          if (match) {
            const token = await jsonwebtoken.sign({ sub: user._id }, "secret");
            //TODO: scrub hash from response
            delete user.password;
            res.status(200).send({ user, token });
          } else {
            res.status(403).send({ password: "Incorrect password." });
          }
        } catch (e) {}
        break;
      default:
        res.status(400).send({});
    }
  } catch (e) {
    res
      .status(400)
      .send({ password: "Something went wrong. Please try again later." });
  }
}
