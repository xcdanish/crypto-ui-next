const niv = require("node-input-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Helper = require("../helper/index");
const mongoose = require("mongoose");
const CryptoDB = require("../models/cryptoModel");
const MarketDB = require("../models/marketModel");
const fs = require("fs");
const axios = require("axios");
// const generator = require('generate-password')
// mongoose.set('useCreateIndex', true)

exports.auth = async (req, res, next) => {
  const objValidation = new niv.Validator(req.query, {
    cryptoId: "required",
    startDate: "required",
    endDate: "required",
  });

  try {
    const matched = await objValidation.check();
    if (!matched) {
      return res
        .status(422)
        .send({ message: "Validation error", errors: objValidation.errors });
    }
    const { startDate, endDate, cryptoId } = req.query;

    const dateArray = await Helper.generateDateRange(startDate, endDate);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let element of dateArray) {
      await delay(5000);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/history`,
        {
          params: {
            date: element, // Date in 'dd-mm-yyyy' format
            localization: "false", // Optional: disable localization
          },
        }
      );
      const price = response.data.market_data?.current_price?.usd;
      const cryptoCheck = await CryptoDB.findOne({
        type: cryptoId,
        date: element,
      });

      if (cryptoCheck) {
        await CryptoDB.findByIdAndUpdate(cryptoCheck._id, {
          $set: {
            amount: price.toFixed(2),
          },
        });
      } else {
        await new CryptoDB({
          type: cryptoId,
          date: element,
          amount: price.toFixed(2),
        }).save();
      }
    }
    return res.status(200).json({
      message: "crypto added successfully",
      // user: dateArray,
    });
  } catch (err) {
    console.log("🚀 ~ exports.auth= ~ err:", err);
    return res.status(500).json({
      message: "Auth Fail_",
      error: err,
    });
  }
};

exports.getGraph = async (req, res, next) => {
  try {
    const { cryptoId } = req.query;
    const matchObj = {};
    if (cryptoId) matchObj.type = cryptoId;

    const cryptoCheck = await CryptoDB.aggregate([
      { $match: matchObj },
      {
        $group: {
          _id: "$type", // Grouping by 'type'
          data: {
            $push: {
              // Use $push to create an array of 'date' and 'amount'
              date: "$date",
              amount: "$amount",
            },
          },
        },
      },
      { $sort: { "data.date": -1 } },
    ]);
    // const keys = [];
    // const values = [];
    // for (const element of cryptoCheck) {
    //   keys.push(Object.values(element.data.date));
    //   values.push(Object.values(element.data.amount));
    //   element.keys = keys;
    //   element.values = values;
    // }
    return res.status(200).json({
      message: "crypto added successfully",
      // user: cryptoCheck,
      data: cryptoCheck,
    });
  } catch (err) {
    console.log("🚀 ~ exports.auth= ~ err:", err);
    return res.status(500).json({
      message: "Auth Fail_",
      error: err,
    });
  }
};

exports.addMarketData = async (req, res, next) => {
  try {
    const staticData = [
      {
        date: "2024-12-01T14:00:00Z",
        open: 9450,
        high: 9500,
        low: 9400,
        close: 9470,
        volume: 1200,
      },
      {
        date: "2024-12-02T14:00:00Z",
        open: 9470,
        high: 9550,
        low: 9460,
        close: 9500,
        volume: 1300,
      },
      {
        date: "2024-12-03T14:00:00Z",
        open: 9500,
        high: 9600,
        low: 9490,
        close: 9580,
        volume: 1400,
      },
      {
        date: "2024-12-04T14:00:00Z",
        open: 9580,
        high: 9650,
        low: 9570,
        close: 9600,
        volume: 1250,
      },
      {
        date: "2024-12-05T14:00:00Z",
        open: 9600,
        high: 9700,
        low: 9590,
        close: 9650,
        volume: 1350,
      },
      {
        date: "2024-12-06T14:00:00Z",
        open: 9650,
        high: 9750,
        low: 9640,
        close: 9700,
        volume: 1500,
      },
      {
        date: "2024-12-07T14:00:00Z",
        open: 9700,
        high: 9800,
        low: 9680,
        close: 9770,
        volume: 1600,
      },
      {
        date: "2024-12-08T14:00:00Z",
        open: 9770,
        high: 9850,
        low: 9750,
        close: 9800,
        volume: 1450,
      },
      {
        date: "2024-12-09T14:00:00Z",
        open: 9800,
        high: 9900,
        low: 9780,
        close: 9850,
        volume: 1550,
      },
      {
        date: "2024-12-10T14:00:00Z",
        open: 9850,
        high: 9950,
        low: 9830,
        close: 9900,
        volume: 1400,
      },
      {
        date: "2024-12-11T14:00:00Z",
        open: 9900,
        high: 10000,
        low: 9880,
        close: 9950,
        volume: 1500,
      },
      {
        date: "2024-12-12T14:00:00Z",
        open: 9950,
        high: 10050,
        low: 9930,
        close: 10000,
        volume: 1600,
      },
      {
        date: "2024-12-13T14:00:00Z",
        open: 10000,
        high: 10100,
        low: 9980,
        close: 10050,
        volume: 1700,
      },
      {
        date: "2024-12-14T14:00:00Z",
        open: 10050,
        high: 10150,
        low: 10030,
        close: 10100,
        volume: 1650,
      },
      {
        date: "2024-12-15T14:00:00Z",
        open: 10100,
        high: 10200,
        low: 10080,
        close: 10150,
        volume: 1500,
      },
      {
        date: "2024-12-16T14:00:00Z",
        open: 10150,
        high: 10250,
        low: 10130,
        close: 10200,
        volume: 1400,
      },
      {
        date: "2024-12-17T14:00:00Z",
        open: 10200,
        high: 10300,
        low: 10180,
        close: 10250,
        volume: 1300,
      },
      {
        date: "2024-12-18T14:00:00Z",
        open: 10250,
        high: 10350,
        low: 10230,
        close: 10300,
        volume: 1250,
      },
      {
        date: "2024-12-19T14:00:00Z",
        open: 10300,
        high: 10400,
        low: 10280,
        close: 10350,
        volume: 1450,
      },
      {
        date: "2024-12-20T14:00:00Z",
        open: 10350,
        high: 10450,
        low: 10330,
        close: 10400,
        volume: 1500,
      },
      {
        date: "2024-12-21T14:00:00Z",
        open: 10400,
        high: 10500,
        low: 10380,
        close: 10450,
        volume: 1400,
      },
      {
        date: "2024-12-22T14:00:00Z",
        open: 10450,
        high: 10550,
        low: 10430,
        close: 10500,
        volume: 1300,
      },
      {
        date: "2024-12-23T14:00:00Z",
        open: 10500,
        high: 10600,
        low: 10480,
        close: 10550,
        volume: 1350,
      },
      {
        date: "2024-12-24T14:00:00Z",
        open: 10550,
        high: 10650,
        low: 10530,
        close: 10600,
        volume: 1450,
      },
      {
        date: "2024-12-25T14:00:00Z",
        open: 10600,
        high: 10700,
        low: 10580,
        close: 10650,
        volume: 1550,
      },
      {
        date: "2024-12-26T14:00:00Z",
        open: 10650,
        high: 10750,
        low: 10630,
        close: 10700,
        volume: 1600,
      },
      {
        date: "2024-12-27T14:00:00Z",
        open: 10700,
        high: 10800,
        low: 10680,
        close: 10750,
        volume: 1700,
      },
      {
        date: "2024-12-28T14:00:00Z",
        open: 10750,
        high: 10850,
        low: 10730,
        close: 10800,
        volume: 1750,
      },
      {
        date: "2024-12-29T14:00:00Z",
        open: 10800,
        high: 10900,
        low: 10780,
        close: 10850,
        volume: 1600,
      },
      {
        date: "2024-12-30T14:00:00Z",
        open: 10850,
        high: 10950,
        low: 10830,
        close: 10900,
        volume: 1500,
      },
      {
        date: "2024-12-31T14:00:00Z",
        open: 10900,
        high: 11000,
        low: 10880,
        close: 10950,
        volume: 1400,
      },
    ];

    const addData = await MarketDB.insertMany(staticData);

    return res.status(200).json({
      message: "market added successfully",
    });
  } catch (err) {
    console.log("🚀 ~ exports.auth= ~ err:", err);
    return res.status(500).json({
      message: "Auth Fail_",
      error: err,
    });
  }
};

exports.getMarketData = async (req, res, next) => {
  const { year, month } = req.query;
  try {
    const data = await MarketDB.find({}).sort({ date: 1 });

    return res.status(200).json({
      message: "market added successfully",
      data: data,
    });
  } catch (err) {
    console.log("🚀 ~ exports.auth= ~ err:", err);
    return res.status(500).json({
      message: "Auth Fail_",
      error: err,
    });
  }
};

exports.getOrderData = async (req, res, next) => {
  try {
    const response = {
      sellOrders: [
        { price: 82.3, amount: 0.15, total: 134.12 },
        { price: 83.9, amount: 0.18, total: 237.31 },
        { price: 84.2, amount: 0.25, total: 252.58 },
        { price: 86.2, amount: 0.35, total: 126.26 },
        { price: 91.6, amount: 0.75, total: 46.92 },
        { price: 92.6, amount: 0.21, total: 123.27 },
        { price: 93.9, amount: 0.55, total: 212.56 },
        { price: 94.2, amount: 0.2, total: 129.26 },
        { price: 96.5, amount: 0.3, total: 150.75 },
        { price: 98.0, amount: 0.4, total: 172.4 },
      ],
      buyOrders: [
        { price: 86.2, amount: 0.35, total: 126.26 },
        { price: 83.9, amount: 0.18, total: 237.31 },
        { price: 93.9, amount: 0.55, total: 212.56 },
        { price: 94.2, amount: 0.2, total: 129.26 },
        { price: 91.6, amount: 0.75, total: 46.92 },
        { price: 88.5, amount: 0.4, total: 135.25 },
        { price: 87.0, amount: 0.5, total: 156.75 },
        { price: 89.0, amount: 0.6, total: 175.5 },
        { price: 90.2, amount: 0.3, total: 145.1 },
        { price: 92.8, amount: 0.45, total: 160.1 },
      ],
    };
    return res.status(200).json({
      message: "market added successfully",
      data: response,
    });
  } catch (err) {
    console.log("🚀 ~ exports.auth= ~ err:", err);
    return res.status(500).json({
      message: "Auth Fail_",
      error: err,
    });
  }
};
