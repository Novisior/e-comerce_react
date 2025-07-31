const app = require("./src/app");
const connect = require("./src/db/db");

connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("✅ Server running at http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
  });
