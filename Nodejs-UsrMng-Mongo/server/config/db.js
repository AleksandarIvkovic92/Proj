const mongoose = require('mongoose');

const uri = "mongodb://mongo:27017/user-management";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to local MongoDB"))
.catch((err) => console.error("❌ Failed to connect:", err));

module.exports = mongoose;
