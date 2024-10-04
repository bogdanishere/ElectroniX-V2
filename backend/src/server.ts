// import mongoose from "mongoose";
// import env from "../env";
// import app from "./app";
// import sql from "./models/neon";

// mongoose
//   .connect(env.MONGO_CONNECTION_STRING)
//   .then(async () => {
//     console.log("Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${env.PORT}`);
//     });

//     const result = await sql`select version()`;
//     console.log(result[0].version.slice(0, 15) + " is working with NEON");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB or NEON", error);
//   });

// server.ts
import mongoose from "mongoose";
import env from "../env";
import app from "./app";
import sql from "./models/neon";

// Funcție pentru conectarea la baze de date
const connectDatabases = async () => {
  try {
    // Conectează-te la MongoDB
    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB");

    // Conectează-te la NEON
    const result = await sql`select version()`;
    console.log(result[0].version.slice(0, 15) + " is working with NEON");
  } catch (error) {
    console.error("Error connecting to MongoDB or NEON", error);
  }
};

// Apelează funcția de conectare
connectDatabases();

// Exportă aplicația Express pentru Vercel
export default app;
