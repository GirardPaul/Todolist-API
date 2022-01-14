const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
    const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {

        const { email, password, firstName, lastName } = req.body;

        if(!(email && password && firstName && lastName)){
            return res.status(400).send({
                message: "Vous devez remplir tout les champs.",
                statusCode: 400
            });
        }

        if(!email.match(regexMail)){
            return res.status(400).send({
                message: "L'email n'est pas valide.",
                statusCode: 400
            });
        }

        const oldUser = await UserModel.findOne({ email });

        if(oldUser){
            return res.status(400).send({
                message: "L'utilisateur existe déjà",
                statusCode: 400
            });
        }

        let encryptedPassword = await bcrypt.hash(password, 10);

        const user = UserModel.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: "ROLE_USER",
            firstName,
            lastName,
        })

        const token = jwt.sign(
            { userId: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;

        res.status(200).send({
            user,
            statusCode: 200,
        });

    } catch (error) {

        res.status(400).json({
            status: "error",
            message: error.message,
        });

    }
}

exports.loginUser = async (req, res) => {
    
    try {

        const { email, password } = req.body;

        if(!(email && password)){
            return res.status(400).send({
                message: "Vous devez remplir tout les champs"
            });
        }

        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(400).send({
                message: "L'utilisateur n'existe pas"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).send({
                message: "Mauvais mot de passe"
            });
        }

        const token = jwt.sign(
            { userId: user._id, email, role: user.role, firstName: user.firstName, lastName: user.lastName },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        user.token = token;


        return res.status(200).json({
            token: user.token,
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })

    } catch (error) {
            
            return res.status(400).send({
                status: "error",
                message: error.message,
            });
    
        }

}