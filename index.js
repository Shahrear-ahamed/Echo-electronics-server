require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
