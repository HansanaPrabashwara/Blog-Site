import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu';
import { AuthContext } from '../context/authContext'
import axios from 'axios';
import moment from 'moment';

function Post() {
  const [post, setPost] = useState({});
  const location  = useLocation()
  const navigate = useNavigate()
  
  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data);
        console.log(res);
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);


  const handleDelete = async ()=>{
    try{
      await axios.delete(`/posts/${postId}`)
      navigate("/");
    } catch(err){
      console.log(err);
    }
  }



  return (
    <div className="single">
      <div className="content">
        <img src={`/upload/${post?.image}`} alt="" />
      <div className="user">
        {post.userImage&& <img src={post?.userImage} alt="" />}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && <div className="edit">
          <Link to={`/write?edit=${post?.id}`} state={post}>
            <img src={Edit} alt="" />
          </Link>
          <Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </Link>
        </div>}
       
      </div>
      <h1>{post.title}</h1>
        {post.desc}
      
      </div>
      <Menu cat={post.cat}/>
      
    </div>
  )
}

export default Post