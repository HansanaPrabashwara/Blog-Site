import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill, {displayName} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';

const Write = () => {

    
    const state = useLocation().state;
     
    const [value,setValue] = useState(state?.desc||"");
    const [title,setTitle] = useState(state?.title||"");
    const [img,setImg] = useState(null);
    const [cat,setCat] = useState(state?.cat||"");

    const navigate = useNavigate();

    const upload = async ()=>{
      try{
        const formData = new FormData();
        formData.append("file", img);
        const res = await axios.post("/upload",formData);
        return res.data;
      }catch(err){
        console.log(err)
      }
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const imgUrl = await upload();

      try{
        state
        ? await axios.put(`/posts/${state.id}`,{
          title,
          desc:value,
          cat,
          img: img ? imgUrl : "",
        })
        : await axios.post('/posts',{
          title,
          desc:value,
          cat,
          img: img ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        })
        navigate(-1);
      }catch(err){
        console.log(err);
      }
    }

    console.log(value)
    return (
        <div className="add">
            <div className="content">
                <input type="text" name="" id="" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue}/>
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:
                        </b>Draft
                    </span>
                    <span>
                        <b>Visibility:
                        </b>Private
                    </span>
                    <input
                        style={{
                        display: "none"
                    }}
                        type="file"
                        id='post_pic'
                        onChange={e=>setImg(e.target.files[0])}/>
                    <label className='post_pic' htmlFor="post_pic">Upload Image</label>
                    <div className="buttons">
                        <button>Save As a Draft</button>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" name='cat' checked={cat === "art"} value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Art</label>
                    </div>

                    <div className="cat">

                        <input type="radio" name='cat'checked={cat === "science"} value="science" id="science" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="science">Science</label>
                    </div>

                    <div className="cat">

                        <input type="radio" name='cat' checked={cat === "technology"} value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">

                        <input type="radio" name='cat' checked={cat === "cinema"} value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">

                        <input type="radio" name='cat' checked={cat === "design"} value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">

                        <input type="radio" name='cat' checked={cat === "food"} value="food" id="food" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="food">Food</label>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Write