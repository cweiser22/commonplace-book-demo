import dbConnect from "./utils/dbConnect";
import * as argon2 from "argon2";
import User from "./models/User";
import Blog from "./models/Blog";

//plants fake data to test
async function exec() {
  await dbConnect();

  const firstUserData = {
    firstName: "Cooper",
    lastName: "Weiser",
    email: "cooper@example.com",
    password: await argon2.hash("firsttestpassword1"),
  };

  const cooper = await User.create(firstUserData);

  const firstBlogData = {
    name: "Cooper Weiser's Commonplace Book",
    owner: cooper._id,
  };

  const coopersBlog = await Blog.create(firstBlogData);

  const firstEntryData = {};
}
exec();
