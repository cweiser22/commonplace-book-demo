/* This is a database connection function*/
import mongoose from "mongoose";

const connection: any = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI || "";

  if (!uri) {
    // TODO: throw connection error
    console.log("No URI.");
  }

  /* connecting to our database */
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
