import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import dbConnect from "../../../utils/dbConnect";
import * as jwt from "jsonwebtoken";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        //TODO: create DTO types
        const newUserData: any = req.body;
        const hash = await argon2.hash(newUserData.password);

        const user = await User.create({ ...newUserData, password: hash });
        const token = jwt.sign({ sub: user._id }, "secret");

        delete user.password;

        res.status(201).send({ user, token });
      } catch (e) {
        res.status(400).send({ detail: "Invalid user data." });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
