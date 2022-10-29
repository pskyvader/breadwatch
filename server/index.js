require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const pgSession = require("connect-pg-simple")(session);
const { connection } = require("./database");

const {
	getAllLogs,
	getLogs,
	updateLogs,
	BREAD,
	CAKE,
	COOKIE,
	WALK,
} = require("./api");

connection();

const app = express();
app.use(
	session({
		store: new pgSession({
			createTableIfMissing: true,
			conObject: {
				connectionString: process.env.DATABASE_URL,
				ssl: {
					// require: true,
					rejectUnauthorized: false,
				},
			},
		}),
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
	})
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.disable("x-powered-by");

// serve up production assets
app.use(express.static("client/build")); //Serves resources from public folder

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
const path = require("path");

app.get("/log/get/all", async (req, res) => {
	const result = await getAllLogs();
	res.json(result);
});

app.get("/log/get/:date?", async (req, res) => {
	const result = await getLogs(parseInt(req.params.date) || Date.now());
	res.json(result);
});

app.get("/bread/add/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		BREAD,
		1
	);
	res.json(result);
});
app.get("/bread/remove/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		BREAD,
		-1
	);
	res.json(result);
});

app.get("/cake/add/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		CAKE,
		1
	);
	res.json(result);
});
app.get("/cake/remove/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		CAKE,
		-1
	);
	res.json(result);
});

app.get("/cookie/add/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		COOKIE,
		1
	);
	res.json(result);
});
app.get("/cookie/remove/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		COOKIE,
		-1
	);
	res.json(result);
});

app.get("/walk/true/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		WALK,
		1
	);
	res.json(result);
});
app.get("/walk/false/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		WALK,
		-1
	);
	res.json(result);
});

app.get("*", (req, res) => {
	console.log(req.params);
	res.sendFile(
		path.resolve(__dirname, "..", "client", "build", "index.html")
	);
});

// if not in production use the port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
