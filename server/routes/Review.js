const express = require("express");
const router = express.Router();
const { Bookshelves, Books, Reviews } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    console.log(req.body);
    await Reviews.create({
        summary: req.body.summary,
        BookId: req.body.BookId,
        UserId: req.body.UserId,
    });
    res.json(req.body);
});

module.exports = router;