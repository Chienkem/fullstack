import React from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios';
import {useEffect,useState} from 'react'
import "./user.css"
function User() {
   const [user,setUser] = useState([]);
   const  {id} = useParams()
   const [comments,setComment] = useState([])
   const[add,setAdd] = useState("")
  
   
   // 
   console.log(comments)
   useEffect(()=>{
    axios.get(`http://localhost:3001/posts/byID/${id}`)
    .then(function (response) {
        setUser(response.data)
    })
  },[])
  //
  useEffect(()=>{
    axios.get(`http://localhost:3001/comments/${id}`)
          .then((res)=>{
              setComment(res.data)
          })
          .catch((error)=>{
            alert(error)
          });
  },[])

  /////////////////////////
  const data = JSON.parse(localStorage.getItem('admin') )
  console.log(data)
    const addComment = ()=>{
       if(data){
        axios.post(`http://localhost:3001/comments/`,{Comment:add,PostId:`${id}`})
        .then((res)=>{
          setComment([...comments,{Comment:add}])
          setAdd('')
        })
        .catch((error)=>{
          alert(error)
        });
       }
       else{
        alert('bạn cần đăng nhập để bình luận')
      }
    }     
    function deleteComment(id_comment){
        axios.delete(`http://localhost:3001/comments/${id_comment}/delete`)
      .then(function (response) {
        setComment(
          comments.filter((item)=>{
            return item.id!==id_comment
          }
        )
        )
      })
    }
    return (
        <div className='User_container'>
            <div className="profile-container">
        <div className="img-container">
        </div>
        <p className="info full-name">{user.username}</p>
        <p className="info role">
        </p>
        <p className="info place">
            <i className="fas fa-map-marker-alt"></i>
            Milan, Italy
        </p>

        <div className="posts-info">
            <p><span>336</span> Posts</p>
            <p><span>4300</span> Likes</p>
            <p><span>87</span> Works</p>
        </div>

        

        <button className="action">Follow</button>
        <button className="action message">Message</button>
    </div>
    <div className='comment'>
    <blockquote className="igure blockquote">
     <p className='chat'>Kênh chat</p>
    </blockquote >
        {
            comments.map((iteam,index)=>{
                return <figure  key={index}>
                <figcaption className=" blockquote-footer">
                  <strong></strong>
                  <div class="commentdelete"> <cite  title="Source Title">{iteam.Comment}</cite>
                  <button className="btn btn-danger" onClick={()=>{deleteComment(iteam.id)}}
                  >Xóa</button></div>
                </figcaption>
              </figure>
            })
        }
       
        <div className='user_comment'>
            <input value={add}  onChange={(e)=>{setAdd(e.target.value)}} type="text"/>
            <button onClick={addComment} className="btn btn-primary">Bình luận</button>
        </div>
    </div>
        </div>
    )
}

export default User
