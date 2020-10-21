import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import jsonwebtoken from "jsonwebtoken";
import Blog from "../../../models/Blog";
import User from "../../../models/User";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = _req;
  const token = _req.headers.authorization;
  await dbConnect();

  if (!token) {
    res
      .status(403)
      .send({ detail: "Authentication credentials were not provided." });
  }

  try {
    const payload: any = await jsonwebtoken.verify(token!, "secret");

    const user = await User.findOne({ _id: payload.sub });

    switch (method) {
      case "GET":
        try {
          const blogs = await Blog.find({ owner: user._id });
          res.status(200).send(blogs);
        } catch (e) {
          res.status(400).send({});
        }
        break;
      case "POST":
        try {
          const newBlogData = { name: _req.body.name, owner: user._id };
          const blog = await Blog.create(newBlogData);
          res.status(201).send(blog);
        } catch (e) {
          res.status(400).send({});
        }
        break;
      default:
        res.status(400).send({});
    }
  } catch (e) {
    res.status(403).send({ detail: "Provided token was invalid." });
  }
}
