const express = require("express");
const cors = require("cors");
const sequelize = require("./util/database");

//routes
const loginRoutes = require("./routes/LoginRoutes");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/user", loginRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
    console.log("Started");
  })
  .catch((e) => console.log(e));
