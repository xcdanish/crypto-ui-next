const express = require("express");
const router = express.Router();
const CryptoController = require("../controllers/cryptoController");
const makeRequest = require("../middleware/make-request");

router.get("/auth", CryptoController.auth);
router.get("/get", CryptoController.getGraph);
router.get("/add-market", CryptoController.addMarketData);
router.get("/get-market", CryptoController.getMarketData);
router.get("/get-order", CryptoController.getOrderData);
module.exports = router;
