const mongoose = require("mongoose");

const DBurl = "mongodb+srv://Danish:danish@mycluster.iqgerp3.mongodb.net/crypto?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const result = await mongoose.connect(DBurl);
    console.log("🚀 Database Connected ...");
  } catch (err) {
    console.error(err.message);
    console.log("Something went wrong");
    process.exit(1);
  }
};

module.exports = connectDB;
