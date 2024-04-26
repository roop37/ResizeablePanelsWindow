const express = require("express");
const router = express.Router();
const DataModel = require("../models/dataSchema");
const CountModel = require("../models/countModel");

router.post("/add", async (req, res) => {
  try {
    await DataModel.deleteMany();

    const newData = new DataModel({ textData: req.body.textData });
    await newData.save();

    const count = await CountModel.findOneAndUpdate(
      {},
      { $inc: { addCount: 1 } },
      { upsert: true }
    );

    res.json({ message: "Data added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/data", async (req, res) => {
  try {
    const data = await DataModel.findOne();
    const count = await CountModel.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json({
      textData: data.textData,
      addCount: count.addCount,
      updateCount: count.updateCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update", async (req, res) => {
  try {
    await DataModel.updateOne({}, { textData: req.body.textData });

    const count = await CountModel.findOneAndUpdate(
      {},
      { $inc: { updateCount: 1 } },
      { upsert: true }
    );

    res.json({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await CountModel.findOne();
    res.json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
