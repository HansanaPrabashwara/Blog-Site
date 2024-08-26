import {db} from '../db.js'
import jwt from 'jsonwebtoken'

export const getPosts = (req,res) =>{
    const q = req.query.cat ? "SELECT * FROM post WHERE cat=?": "SELECT * FROM post";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data);
    })
}

export const getPost = (req,res) =>{
    const q = "SELECT p.id, `username`,`title`,`desc`,p.image, u.image AS userImage,`cat`,`date` FROM user u JOIN post p ON u.id = p.uid where p.id = ? "

    db.query(q,[req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data[0])
    })
}

export const addPost = (req,res) =>{
    const token = req.cookies.Access_Token
    if(!token) return res.status(401).json("Not Authenticated")
    
    jwt.verify(token,"Hashi_21",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        
        const q = "INSERT INTO post (`uid`,`title`,`desc`,`image`, `date` ,`cat`) VALUES (?)"

        const values = [
            userInfo.id,
            req.body.title,
            req.body.desc,  
            req.body.img,
            req.body.date,
            req.body.cat
        ]

        db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.json("Post has been deleted!");
        })
    
    });
}

export const deletePost = (req,res) =>{
    const token = req.cookies.Access_Token
    if(!token) return res.status(401).json("Not Authenticated")
    
    jwt.verify(token,"Hashi_21",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        
        const postId = req.params.id
        const q = "DELETE FROM post WHERE `id` = ? AND `uid` = ?"

        db.query(q,[postId,userInfo.id], (err,data)=>{
            if(err) return res.status.json("You can delete only your posts!")

            return res.json("Post has been deleted!")
        })
    })
}

export const updatePosts = (req,res) =>{
    const token = req.cookies.Access_Token
    if(!token) return res.status(401).json("Not Authenticated")
    
    jwt.verify(token,"Hashi_21",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        
        const postId = req.params.id
        const q = "UPDATE post SET `title` = ? ,`desc` = ? ,`image` = ? ,`cat` = ? WHERE `id` = ? AND `uid` = ?"

        const values = [
            req.body.title,
            req.body.desc,  
            req.body.img,
            req.body.cat
        ]

        db.query(q,[...values, postId, userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.json("Post has been deleted!");
        })
    
    });
}
