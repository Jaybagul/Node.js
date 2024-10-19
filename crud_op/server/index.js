const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/getdata", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

app.post("/adddata", (req, res) => {
  const getDataFromFrontend = req.body;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      let dbData = JSON.parse(data);
      dbData.product.push(getDataFromFrontend);
      fs.writeFile("./db.json", JSON.stringify(dbData), (err) => {
        if (!err) {
          res.send("added product successfully");
        } else {
          res.send("something failed");
        }
      });
    } else {
      res.send("Error while reading db.json");
    }
  });
});

app.put("/update/:id", (req, res) => {
  const getDataFromParam = req.params.id;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }
    try {
      const products = JSON.parse(data);
      products.product.forEach((el, index) => {
        if (el.id === parseInt(getDataFromParam)) {
          // products.product.splice(index, 1, req.body);
          products.product[index] = req.body;
          fs.writeFile("./db.json", JSON.stringify(products), (writeErr) => {
            if (writeErr) {
              return res.status(500).send("Error writing to database.");
            }
            res.send("Update product successfully");
          });
        }
      });
    } catch (parseError) {
      return res.status(500).send("Error parsing database.");
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const getIdForDelete = req.params.id;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }

    try {
      const products = JSON.parse(data);
      products.product.forEach((el, index) => {
        if (el.id === parseInt(getIdForDelete)) {
          products.product.splice(index, 1);
          fs.writeFile("./db.json", JSON.stringify(products), (writeErr) => {
            if (writeErr) {
              return res.status(500).send("Error writing to database.");
            }
            res.send("Delete product successfully");
          });
        }
      });
    } catch (parseError) {
      return res.status(500).send("Error parsing database.");
    }
  });
});

app.listen(5050, () => {
  console.log("running on port 5050");
});
