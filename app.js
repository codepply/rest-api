//imports
const express = require("express");

//declarations
const app = express();
const PORT = 8080;

//global
app.use(express.json());

//routes

app.get("/", (req, res) => {
	res.json({message: "Hello from express server"});
});

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
