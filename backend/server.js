const express = require("express");
const cors = require('cors')
const morgan = require("morgan");

const app = express();
app.use(cors())
app.use(express.json())

morgan.token("type", function (req, res) {
  return String(JSON.stringify(req.body))
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

const data = [
  {
    id: 0,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(data);
});

const date = new Date();
app.get("/api/info", (req, res) => {
  res.send(`Phonebook has info for ${data.length} persons <br />${date}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((el) => el.id === id);
  if (!person) return res.status(404).end();
  res.send(person);
});
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.number || !body.name)
    return res.status(400).json({ error: "Missing name or number" });
  if (data.find((el) => el.name === body.name))
    return res.status(400).json({ error: "User already exists" });
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  };

  data.concat(person);
  res.send(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
