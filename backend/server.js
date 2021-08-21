const next = require("next");
const express = require("express");
const connectDB = require("./utils/dbConnect");
const Individual = require("./models/Test");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(express.json());

    connectDB();

    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body;
        
        const userData = {name: {firstName: "Saishnu", lastName: "Test"}, email, password}
        const individual = await Individual.create(userData);

        let success = true
        if (individual){
            console.log("User Created Successfully");
        }
        else{
            console.log("Error encountered.");
            success = false;
        }
        res.json({
            email,
            password,
            success: success
        });
    })

    server.get("*", (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {

        if (err) throw err;
        console.log(`Listening on PORT ${port}`);
    })
})