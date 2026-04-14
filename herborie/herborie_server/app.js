const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



require('dotenv').config()


const server = express()

const {PORT,MONGO_CONNECTION} = process.env ;

server.use(express.json());

server.use(cors());



       // .then(()=> console.log('Mongo DBsuccessfully connected'))
       // .catch(err => console.log('MongoDB error:' , err))


 mongoose.connect(MONGO_CONNECTION,{ dbName : 'herboria'})
        .then(() => console.log(`Database it's connected`))
       .catch(err => console.err("Database connection error :", err));
       
const router = require('./routes')
server.use('/api', router);
server.listen(PORT, () => { 
    
    console.log(`Server on port ${PORT}`);
})