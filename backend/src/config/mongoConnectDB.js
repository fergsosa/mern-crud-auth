import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const bold = (text) => `\x1b[1m${text}\x1b[0m`;
  try {
    await mongoose.connect(process.env.DB_MONGO_URL);
    console.log(bold("--→ Connected MongoDB ✅"));
  } catch (err) {
    console.error(bold("🚫 --→ Connection error MongoDB:"), err);
    process.exit(1);
  }
};

export default connectDB;

/*
mongosh
show dbs;
use todo_list;
show collections;
db.users.find();
*/
