const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const bcrypt = require('bcrypt')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.status(200).json("Success"); // Send 200 OK status
                } else {
                    res.status(400).json("Incorrect password"); // Send 400 Bad Request status
                }
            } else {
                res.status(404).json("User not found"); // Send 404 Not Found status
            }
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json("Internal server error"); // Send 500 Internal Server Error status
        });
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash =>{

        EmployeeModel.create(name, email, hash)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
    })
    .catch(err =>console.log(err))
   
});

const server = app.listen(8000, () => {
    console.log("Server started");
});

server.on('listening', () => {
    console.log("Server is now listening on port 8000");
});

server.on('error', (error) => {
    console.error("Server encountered an error:", error);
});
