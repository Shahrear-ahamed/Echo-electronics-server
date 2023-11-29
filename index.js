require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

async function bootstrap() {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`💽👌 Database is connected successfully`);

    app.listen(port, () => {
      console.log(`💻👌 Application  listening on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
}

bootstrap();
