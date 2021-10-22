const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


//middleware is added
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("running my curd server-practric");
});

//uder: mybduser1
//pass: HeHPXHwtnX5CysZH


const uri =
    "mongodb+srv://mybduser1:HeHPXHwtnX5CysZH@cluster0.cnnr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});




async function run() {
    try {
        await client.connect();
        const database = client.db("footballmaster");
        const userCollection = database.collection("experts");
        // POST API
        app.post('/experts', async (req, res) => {
            const newExpert = req.body;
            const result = await userCollection.insertOne(newExpert);
            console.log('got a new user', req.body);
            console.log('added user', result);
            res.json(result);
        })
        //GET API
        app.get('/experts', async (req, res) => {
            const cursor = userCollection.find({});
            const expert = await cursor.toArray();
            res.send(expert);
        })
        //DELETE API
        app.delete('/experts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log('delete with id', result);
            res.json(result);
        })
        //UPDATE API
        app.get('/experts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const expert = await userCollection.findOne(query);
            console.log('load user with', expert);
            res.send(expert);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);











app.listen(port, () => {
    console.log("running server on port", port);
});
