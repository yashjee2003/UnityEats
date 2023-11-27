const { Database } = require("quickmongo");
const express = require("express");
const color = require("colors");

const db = new Database(
  "mongodb+srv://yash:yash@food-donation.5hpqh3x.mongodb.net/?retryWrites=true&w=majority"
);
db.connect();
db.on("ready", async () => {
  console.log(color.bold.red("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+="));
  console.log(
    color.bold.cyan(`---------------------------------------------------`)
  );
  console.log(color.bold.yellow(`Database Connected`));
  console.log(
    color.bold.cyan(`---------------------------------------------------`)
  );
  console.log(color.bold.red("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+="));
});

const app = new express();
app.use(express.static("public"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

port = 3030;
app.get("/api/login/:email/:password", async (req, res) => {
  console.warn(req.params.email);
  console.warn(req.params.password);
  const email = req.params.email;
  const password = req.params.password;
  try {
    const emails = await db.getArray("emails");
    if (emails.includes(email)) {
      const pass = await db.get(`all-mail.${email}.pass`);
      if (password == pass) {
        res.json({ success: true, message: "Login Successful" });
      } else {
        res.json({ success: false, message: "Incorrect Password" });
      }
    } else {
      res.json({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/", async function (req, res) {
  res.send("Hello World");
});

app.get("/api/continue/:name/:email/:password", async (req, res) => {
  console.warn(req.params.name);
  console.warn(req.params.email);
  console.warn(req.params.password);
  const name = req.params.name;
  const email = req.params.email;
  const pass = req.params.password;
  try {
    const emails = await db.getArray("emails");
    console.log(emails);
    if (emails.includes(email)) {
      res.json({ success: false, message: "This Email is Already Used" });
    } else {
      await db.push(`emails`, email);
      await db.set(`all-mail.${email}.pass`, pass);
      await db.set(`all-mail.${email}.name`, name);
      res.json({ success: true, message: "Registration Successfull" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://104.131.181.55:${port}`);
});
