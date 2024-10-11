    const http = require("http");
    const fs = require("fs");

    const server = http.createServer((req, res) => {

        if (req.method === "GET" && req.url === "/home") {
            res.end("<h1>Welcome to Home Page</h1><h1>This is a Home Page</h1>");

        } else if (req.method === "GET" && req.url === "/about") {
            res.end("<h1>This is an About Page</h1>");

        } else if (req.method === "GET" && req.url === "/getproductdata") {
            fs.readFile("./db.json", "utf-8", (err, data) => {
                if (err) {
                    
                    res.end("<h1>Error reading the file</h1>");
                    return;
                }
                let userProductData = JSON.parse(data).products;
                res.write("<h1>This is Product Data</h1>");
                res.end(JSON.stringify(userProductData));
            });

        } else if (req.method === "GET" && req.url === "/user") {
            fs.readFile("./db.json", "utf-8", (err, data) => {
                if (err) {
                    res.end("<h1>Error reading the file</h1>");
                    return;
                }
                let userData = JSON.parse(data).user;
                res.write("<h1>This is User Data</h1>");
                res.end(JSON.stringify(userData));
            });

        } else {
        
            res.end("<h1>Page Not Found</h1>");
        }
    });

    server.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
