const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const readDB = (callback) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(data));
    }
  });
};

const writeDB = (data, callback) => {
  fs.writeFile("./db.json", JSON.stringify(data), (err) => {
    callback(err);
  });
};

app.get("/getdata", (req, res) => {
  readDB((err, data) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }
    res.json(data);
  });
});


app.post("/adddata", (req, res) => {
  const newProduct = req.body;
  readDB((err, dbData) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }
    dbData.product.push(newProduct);
    writeDB(dbData, (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error writing to database.");
      }
      res.send("Product added successfully");
    });
  });
});


app.put("/update/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  readDB((err, dbData) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }
    const productIndex = dbData.product.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).send("Product not found.");
    }
    dbData.product[productIndex] = updatedProduct;
    writeDB(dbData, (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error writing to database.");
      }
      res.send("Product updated successfully");
    });
  });
});


app.delete("/delete/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  readDB((err, dbData) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }
    const productIndex = dbData.product.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return res.status(404).send("Product not found.");
    }
    dbData.product.splice(productIndex, 1);
    writeDB(dbData, (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error writing to database.");
      }
      res.send("Product deleted successfully");
    });
  });
});

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
