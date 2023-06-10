require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { sequelize, connection } = require("./database");
const apiRoute = require("./routes/api");
const { login, loginCookie, logout, register } = require("./pages/user");

const {
	getAllLogs,
	getLogs,
	updateLogs,
	BREAD,
	CAKE,
	COOKIE,
	FRUIT,
	VEGETABLE,
	WALK,
} = require("./api");

const { getUserByToken } = require("./api/user");

connection().catch((err) => {
	console.log("connection error:", err);
});
const sessionStore = new SequelizeStore({
	db: sequelize,
});

const app = express();
app.use(
	session({
		store: sessionStore,
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
	})
);
sessionStore.sync();
app.use(cookieParser(process.env.SESSION_SECRET));
app.disable("x-powered-by");

// serve up production assets
app.use(express.static("client/build")); //Serves resources from public folder

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
const path = require("path");

const tenMinutes = 600000;
const userCache = {};

app.post("/api/login", async (req, res) => {
	res.json(login(req, res));
});
app.get("/api/logincookie", async (req, res) => {
	res.json(loginCookie(req));
});
app.get("/api/logout", async (req, res) => {
	res.json(logout(req, res));
});
app.get("/api/register", async (req, res) => {
	res.json(register(req, res));
});

app.use("/api/*", async (req, res, next) => {
	const session = { ...req.session };
	if (!session.token) {
		return res.json({
			error: true,
			message: "No valid user data found",
		});
	}

	const user = userCache[session.token];
	if (user) {
		req.user = user;
		return next();
	}
	const validUser = await getUserByToken(session.token);
	if (validUser.error) {
		return res.json(validUser);
	}
	userCache[session.token] = validUser;
	req.user = validUser;
	next();
});

app.use("/api", apiRoute);
/*
app.get("*.*", (req, res) => {
	res.sendStatus(404);
});

app.get("*", (req, res) => {
	res.sendFile(
		path.resolve(__dirname, "..", "client", "build", "index.html")
	);
});
*/

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

app.get("/fruit/add/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		FRUIT,
		1
	);
	res.json(result);
});
app.get("/fruit/remove/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		FRUIT,
		-1
	);
	res.json(result);
});

app.get("/vegetable/add/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		VEGETABLE,
		1
	);
	res.json(result);
});
app.get("/vegetable/remove/:date?", async (req, res) => {
	const result = await updateLogs(
		parseInt(req.params.date) || Date.now(),
		VEGETABLE,
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

app.get("*.*", (req, res) => {
	res.sendStatus(404);
});
app.get("*", (req, res) => {
	console.log(req.params);
	res.sendFile(
		path.resolve(__dirname, "..", "client", "build", "index.html")
	);
});

// if not in production use the port 5000
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
