import mongoose from "mongoose";
import env from "../env";
import app from "./app";
import sql from "./models/neon";

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(async () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });

    const result = await sql`select version()`;
    console.log(result[0].version.slice(0, 15) + " is working with NEON");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB or NEON", error);
  });
