const mongoose = require("mongoose");

const connection = {}
const MONGO_URI = "mongodb+srv://Ley:f1fy76tQZP5Q8rgE@cluster-0.9apom.mongodb.net/CRM?retryWrites=true&w=majority"

async function connectDB(){
    if (connection.isConnected){
        return;
    }

    console.log(MONGO_URI)
    const db = await mongoose.connect(MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

        connection.isConnected = db.connections[0].readyState;
        if (connection.isConnected){
            console.log("Successfully connected to MongoDB!");
        }

}

module.exports = connectDB;