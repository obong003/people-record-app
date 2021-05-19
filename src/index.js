const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const dbSetup = require("./database/setup");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SCHEMA setup
const records = require('./model/schema_record');

//Mongoose Database SETUP
dbSetup();

// POST REQUEST TO CREATE A NEW RECORD
app.post('/records/post', (req, res) => {
    // get book details from req.body and post to db and send response to client.
    records.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, newRecord) => {
        if (err) {
            return res.status(500).json({ message: err})
        } else {
            return res.status(200).json({ message: "new Record created", newRecord})
           
        }
    })
})

// get request to retrieve a single record
app.get('/records/find/:id', (req, res) => {
    records.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!data) {
            return res.status(404).json({ message: "No such record found!"})
        } else {
            return res.status(200).json({ message: data})
        }
    })
})

//get request to retrieve a single record by id
app.get('/records/:id', (req, res) => {
    let id = req.params.id
    records.findById(id, (err, data) => {
        if (err) {
            res.status(500).json({ message: err})
        } else if (!data) {
            return res.status(404).json({ message: err})
        } else {
            return res.status(200).json({ message: data })
        }
    })
})

//request to view all records
app.get('/records', (req, res) => {
    records.find({}, (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: data});
        }
    })
    ``})
    
// put request to update a single entity record
app.put('/records', (req, res) => {
    records.findOneAndUpdate({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, data) => {
    if (err) {
        return res.status(500).json({ message: err });
    } else if (!data) {
        return res.status(404).json({ message: "No Resource found"});
    } else {
        data.save((err, info) => {
            if (err) {
                return res.status(500).json({ message: err })
            } else {
                return res.status(200).json({ message: "Info Updated Successfully", info})
            }
        })
    }
       }) 
    })

//put request to update single entity using id
app.put('/records/:id', (req, res) => {
    records.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            email: req.body.email,
            country: req.body.country
        }, (err, data) => {
            if (err) {
                return res.status(500).json({ message: err });
            } else if (!data) {
                return res.status(404).json({ message: "No Data Found "})
            } else {
                data.save((err, updatedInfo) => {
                    if (err) {
                        return res.status(500).json({ message: "error saving file", err })
                    } else {
                        return res.status(200).json({ message: "Info Updated Successfully", updatedInfo })
                    }
                })
            }
        }
    )
    })

//Delete request to delete an entity
app.delete('/records/:id', (req, res) => {
    records.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!data) {
            return res.status(404).json({ message: "record not found"})
        } else {
            return res.status(200).json({ message: "record successfully deleted"})
        }
    })
})





app.listen(port, () => console.log("app running!")); 