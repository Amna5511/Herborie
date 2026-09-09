const { Schema , model}= require("mongoose");

const plantSchema = new Schema (
    {
        name : {
            type : String,
            required : true, 
            trim : true,
        },
        latin_name: {
            type : String,
            required : true, 
            trim : true,
        },
        image : {
            type : String ,
            required : true ,
        },
        geolocalisation : {
            type : String,
            required : true,
            trim : true,
        },
        medicalpart : 
         [String],
         
        effects : 
        [String],

        medicaluse : {
            type : String,
            required : true,
        },
        warnings : {
            type : String,
            required : true,
        }, 
        poisonous  : {
            type : Boolean,
            default : false 
        }

       
    },
    {
        collection : 'Plant',
        timestamps : true ,
    }
);

const Plant = model('Plant',plantSchema);


module.exports = Plant;