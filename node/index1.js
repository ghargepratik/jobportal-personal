// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const connection = require("./config/connection.js"); //DB connection
// connection();

// const adminrouter = require("./routes/adminRoute.js");
// const jobsrouter = require("./routes/jobsRoute.js");
// const api = require("./routes/api.js");
// const activitirouter = require("./routes/activitiRoute.js");
// const interviewrouter = require("./routes/interviewRoute.js");
// const emailtemplaterouter = require("./routes/emailtemplateRoute.js");
// global.__basedir = __dirname;

// const app = express();

// app.use("/public", express.static("./public"));

// //Middleware
// app.use(cors());
// app.use(express.json());

// //react setup
// const path = __dirname + "/client/";
// app.use(express.static(path));
// //node api to call react app
// app.get("/", function (req, res) {
//   console.log("client");
//   res.sendFile(path + "index.html");
// });

// //ROUTES

// app.use("/api", api);

// app.listen(process.env.PORT, () => {
//   console.log(`server running ${process.env.PORT}`);
// });
