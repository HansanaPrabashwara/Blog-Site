import {db} from "../db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const register = (req, res) => {

    // check exidting user
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"

    db.query(q,[req.body.email, req.body.username], (err,data)=>{
        if(req.body.username == "") return res.status(400).json("Please Add a Username")
        if(req.body.email == "") return res.status(400).json("Please Add a Email") 
        if(req.body.password == "") return res.status(400).json("Please Add a Password")
        if(err) return res.json(err);
        if(data.length) return res.status(400).json("User Already Exists!") 
        
    
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "insert into user(`username`,`email`,`password`) values (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q, [values], (err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User has been created")
        })
    });
       
}

export const login = (req, res) => {
    //Check user

    const q = "SELECT * FROM user WHERE username = ?"

    db.query(q,[req.body.username], (err,data)=>{
        if(err) return res.json(err);
        if(!data.length) return res.status(404).json("User Doesn't Exists!") 

        // Check password
        const validPass = bcrypt.compareSync(req.body.password, data[0].password);
        if(!validPass) return res.status(400).json("Invalid Password") 

        // return res.status(200).json("Logged In")
        const token = jwt.sign({id: data[0].id}, "Hashi_21");
        
        const {password, ...info} = data[0];

        res.cookie("Access_Token", token, {
            httpOnly:true
        }).status(200).json(info)
    });
}

export const logout = (req, res) => {
    res.clearCookie("Access_Token",{
        sameSite :"none",
        secure:true 
    }).status(200).json("User has been logged out.")
}