const express = require("express");
const router = express.Router();

router.use("/crypto", require("./cryptoRoute"));

module.exports = router;
