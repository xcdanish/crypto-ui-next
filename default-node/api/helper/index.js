const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");

exports.getValidImageUrl = async (filename, name = "SH") => {
  // console.log(true);
  if (filename === "" || filename === undefined || filename === null) {
    filename =
      "https://ui-avatars.com/api/?name=" +
      name +
      "&rounded=true&background=c39a56&color=fff&format=png";
  } else {
    filename = process.env.URL + "uploads/" + filename;
  }
  return filename;
};

exports.getImageUrl = async (filename, name = "SH") => {
  if (filename === "" || filename === undefined || filename === null) {
    filename =
      "https://ui-avatars.com/api/?name=" +
      name +
      "&rounded=true&background=c39a56&color=fff&format=png";
  } else {
    filename = process.env.URL + filename;
  }
  return filename;
};

// exports.getValidImageUrl = async (filename, name = "SH") => {
//   filename = process.env.URL + filename;
//   return filename.replace(/\\/g, "/");
// };

exports.writeErrorLog = async (req, error) => {
  const requestURL = req.protocol + "://" + req.get("host") + req.originalUrl;
  const requestBody = JSON.stringify(req.body);
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  fs.appendFileSync(
    "errorLog.log",
    "REQUEST DATE : " +
      date +
      "\n" +
      "API URL : " +
      requestURL +
      "\n" +
      "API PARAMETER : " +
      requestBody +
      "\n" +
      "Error : " +
      error +
      "\n\n"
  );
};

exports.generateRandomString = (length, isNumber = false) => {
  var result = "";
  if (isNumber) {
    var characters = "0123456789";
  } else {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// exports.updateKeyData = async() = {
//   let rational = await ProductDB.find({});

//   for(let i = 0; i <rational.length; i++) {
//   const element = rational[i]
//   await ProductDB.findByIdAndUpdate(element._id, { $set: { price: 999 } })
// }
// }

exports.generateDateRange = async (startDate, endDate) => {
  const dateArray = [];

  // Parse the start and end date strings into Date objects
  let start = new Date(startDate.split("-").reverse().join("-"));
  let end = new Date(endDate.split("-").reverse().join("-"));

  // Loop to generate dates
  while (start <= end) {
    // Format the current date in dd-mm-yyyy
    const day = String(start.getDate()).padStart(2, "0");
    const month = String(start.getMonth() + 1).padStart(2, "0");
    const year = start.getFullYear();

    // Add the formatted date to the array
    dateArray.push(`${day}-${month}-${year}`);

    // Move to the next day
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
};
