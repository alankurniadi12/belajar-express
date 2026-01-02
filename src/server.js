import app from "./app.js";
import connectDB from "./config/database.js";

const port = 3000;

await connectDB()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});