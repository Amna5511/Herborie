//const authService = require 


const authController = {
 
    register : async (req,res)=>{

     try {
        //body de la requete 
        const newUser = req.body;
        // si lemail existe deja on renvoie un message et un code status 
        if(await authService.emailAlreadyExists(newUser.email )){
            res.status(409).json({statusCode: 409 ,message: 'This e-mail has already been used'});
        }
        //si pas on rajoute l'utilisateur  et on encode les infos 
        const userCreated = await authService.create(newUser);

        res.location(`/api/user/${userCreated.id}`);
        res.status(201).json ({
            id: userCreated._id,
            firstname: userCreated.firstname,
            lastname: userCreated.lastname
        });

     }catch(err){
        res.sendStatus(500)
     }

    },
    login : async (req,res)=>{
        try {
            //recuperer les infos de connexion qui sont dans le body 
            const credentials = req.body;
            //et on essaye de trouver le user avec les memes infos 
            const userFound = await authService.findByCredentials(credentials);

            if(!userFound){
                res.status(401).json({statusCode: 401, message: 'the information taht you have introduced might be wrong  '})
            }else{
                //si le user a ete trouve etc alors on lui genere le token
                const token = await jwtUtils.generate(userFound);
                
                return res.status(200).json({
                    id: userFound._id,
                    firstname: userFound.firstname,
                    lastname : userFound.lastname,
                    token
                })
            }

        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }

    }
}
module.exports=authController;