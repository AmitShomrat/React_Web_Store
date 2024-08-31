const express = require('express')
const app = express()
const mongojs = require('mongojs');
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024');
const myCollection = db.collection('final_<Amit_Ofek>');
const cors = require ('cors')
const {response} = require("express");
app.use(express.json());
app.use(express.static('public'));
app.use(cors())


//Cross Origin URL Get requests
//GET countries and cities.
app.get('/api/countries', async (req , res) =>{
    console.log("Server fetch Countries");
    try{
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: "Server fetching countries error", err });
    }
})


// Create a GET route to fetch documents by type
app.get('/items/:type', (req, res) => {

    const type = req.params.type; // Get the type from the route parameters
    if(!type)
        return res.status(400).json({ error: 'Type is required' });

    console.log(`Server GET by type request: ${type}`)

    myCollection.findOne({ type: type }, (err, item) => {
        if (err) {
            res.status(500).json({ error: err.message }); // Send an error response if something goes wrong
            return;
        }

        if (!item) {
            res.status(404).json({ error: 'No items found with the specified type.' }); // Send a 404 response if no document is found
            return;
        }
        res.json(item); // Send the found document as a JSON response
    });
});


//Request GET fetching all records from DataBase. (if necessary)
app.get('/items', (req, res) => {
    myCollection.find({}, (err, doc) => {
        if (err) {
            console.error('Database get/record error:', err);
            return res.status(500).send({ error: 'An error occurred while fetching the record.' });
        }
        if (!doc) {
            console.error('Database get/record error:', err);
            return res.status(404).send({ error: 'record not found' });
        }

        res.json(doc);
    });
});


//Unique Order ID generator.
function generateUniqueOrderId () {
  return Math.random().toString(16).slice(2);
}

//POST - Add a new document
app.post('/items/order', (req, res) => {
    console.log("new order request; Server");
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }

    // Generating a unique order id
    const OrderID = generateUniqueOrderId();
    const newItem = {
        "_id": OrderID, // Assuming `_id` is a string in your collection
        "type": "order",
        "created-at": Date.now(),
        "data": {
            contact: {
                "name": req.body.contact.name,
                "phone": req.body.contact.phone,
                "address": req.body.contact.address,
                "country": req.body.contact.country,
                "city": req.body.contact.city,
                "email": req.body.contact.email
            },
            "carts": req.body.carts,
            "totalPrice": req.body.totalPrice,
            "totalQuantity": req.body.totalQuantity,
            "fastDelivery": req.body.fastDelivery,
        }
    };

    myCollection.insert(newItem, (err, doc) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({OrderID: doc._id});
    });
});

app.post('/items', (req, res) => {
    myCollection.insert(req.body, (err, doc) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(doc);
    })
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
