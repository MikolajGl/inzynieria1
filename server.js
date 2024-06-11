const path = require("path");
const express = require ("express");
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,() => console.log(`server running on port ${PORT}`));
