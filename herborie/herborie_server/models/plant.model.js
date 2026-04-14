const { Schema , model}= require("mongoose");

const plantSchema = new Schema (
    {
        name : {
            type : String,
            required : true, 
            trim : true,
        },
        image : {
            type : String ,
            required : true ,
            trim : true,
        },
        geolocalisation : {
            type : String,
            required : true,
            trim : true,
        },
        medicalpart : {
            type : String,
            required : true,
        }, 
        medicaluse : {
            type : String,
            required : true,
        },
        warnings : {
            type : String,
            required : true,
        },  
       
    },
    {
        collection : 'Plant',
        timestamps : true ,
    }
);

const Plant = model('Plant',plantSchema);


module.exports = Plant;