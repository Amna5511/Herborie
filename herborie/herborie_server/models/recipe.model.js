const { Schema , model}= require("mongoose");

const recipeSchema = new Schema (
    {
        title : {
            type : String,
            required : true, 
            trim : true,
        },
        content : {
            type : String ,
            required : true ,
            trim : true,
        },
        author : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
        plant: {
            type: Schema.Types.ObjectId,
            ref : 'Plant',
            required : true ,
        },
        createdAt : {
            type : Date,
            default : () => Date.now(), 
        }
       
    },
    {
        collection : 'Recipe',
        timestamps : true ,
    }
);

const Recipe = model('Recipe',recipeSchema);


module.exports = Recipe;