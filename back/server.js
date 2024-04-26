const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://sanbedan9989:aendjaejf93847@cluster0.a8pa6k5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("MongoDB connected Yeaahh");
    await initializeCounts();
  })
  .catch((err) => console.log(err));

async function initializeCounts() {
  const CountModel = require("./models/countModel");
  const count = await CountModel.findOne();
  if (!count) {
    await CountModel.create({ addCount: 0, updateCount: 0 });
  }
}

app.use("/api", require("./routes/api"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
