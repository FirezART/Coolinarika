const { urlencoded } = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "coolinarika",
});

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Read Categorii
app.get("/api/categorii", (req, res) => {
  const sqlStatement = "SELECT * FROM categorii";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

//Insert Categorii
app.post("/api/insertcategorii", (req, res) => {
  const categorie = req.body.categorie;
  const sqlStatement = "INSERT INTO `categorii` (`categorie`) VALUES (?);";
  db.query(sqlStatement, [categorie], (err, result) => {
    console.log(result);
  });
});

//Read Ingrediente
app.get("/api/ingrediente", (req, res) => {
  const sqlStatement = "SELECT * FROM ingrediente";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

//Insert Ingredient
app.post("/api/insertingredient", (req, res) => {
  const ingredient = req.body.ingredient;
  const um = req.body.um;
  const sqlStatement =
    "INSERT INTO `ingrediente` (`ingredient`, `um`) VALUES (?, ?);";
  try {
    db.query(sqlStatement, [ingredient, um], (err, result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//DELETE INGREDIENT
app.post("/api/deleteingredient", (req, res) => {
  const ingredient = req.body.ingredient;
  const sqlStatement = "DELETE FROM `ingrediente` WHERE `ingredient` = (?);";
  try {
    db.query(sqlStatement, [ingredient], (err, result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//Read Retete
app.get("/api/retete", (req, res) => {
  const sqlStatement = "SELECT * FROM retete";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

//Insert Reteta
app.post("/api/insertreteta", (req, res) => {
  const id = req.body.id_reteta;
  const nume = req.body.numeReteta;
  const poza = req.body.poza;
  const sqlStatement =
    "INSERT INTO `retete` (`id_reteta`,`denumire`, `poza`) VALUES (?, ?, ?);";
  db.query(sqlStatement, [id, nume, poza], (err, result) => {
    console.log(err);
  });
});

//Read Volum
app.get("/api/volum", (req, res) => {
  const sqlStatement = "SELECT * FROM volum";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

//Read Volum pentru carduri
app.get("/api/volumcard", (req, res) => {
  const sqlStatement = "SELECT * FROM `volum` WHERE `descriere` IS NOT NULL";
  db.query(sqlStatement, (err, result) => {
    res.send(result);
  });
});

//Insert Volum
app.post("/api/insertvolum", (req, res) => {
  const id_categorie = req.body.id_categorie;
  const id_reteta = req.body.id_reteta;
  const id_ingredient = req.body.id_ingredient;
  const um = req.body.um;
  const cantitate = req.body.cantitate;
  const descriere = req.body.descriere;
  const preparare = req.body.preparare;
  const sqlStatement =
    "INSERT INTO `volum` (`id_categorie`, `id_reteta`, `id_ingredient`, `um`, `cantitate`, `descriere`, `preparare`) VALUES (?, ?, ?, ?, ?, ?, ?);";
  db.query(
    sqlStatement,
    [
      id_categorie,
      id_reteta,
      id_ingredient,
      um,
      cantitate,
      descriere,
      preparare,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});

app.listen(3001, () => {
  console.log("Running the Node.js server on port 3001");
});
