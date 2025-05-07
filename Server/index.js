const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee')

const app = express();
app.use(express.json())
app.use(cors())
// mongoose.connect("mongodb://127.0.0.1:27017/employee")
mongoose.connect("mongodb+srv://chandankumar8789460:zTD7usdMUhGFoWyp@cluster0.tjuirkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")



app.post("/login", (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.status(200).json({ message: "Login successful" });
                } else {
                    res.status(401).json({ message: "Wrong password" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        });
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))

})
app.listen(3001, () => {
    console.log("Server is running");
})