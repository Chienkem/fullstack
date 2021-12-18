import  { useState } from 'react'
import './posts.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Posts({posts}) {
   
    let navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('admin') )
    function deletePost(id){
           if(data){
            axios.delete(`http://localhost:3001/posts/${id}/delete`)
            .then(function (response) {
                window.location.reload()
            })
           }
           else{
               alert('bạn cần đăng nhập để xóa bài viết')
           }
    }
 
    return (
        <div className='card_container' >
            {
                posts.map((item,index)=>{
                    return (
                        <div key={index} className="card text-center">
                            <i onClick={()=>{
                                deletePost(item.id)
                            }} id="icon"class="bi bi-x-lg"></i>
                            <div className="card-header">
                                 <strong>Người viết bài</strong>:  {item.username}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Tieu de:{item.title}</h5>
                                <p className="card-text">{item.postText}</p>
                                <button className="btn btn-primary" onClick={()=>{navigate(`posts/byID/${item.id}`)}}>Xem bình luận</button>
                            </div>
                            <div className="card-footer text-muted">
                                ngay tao:{item.createdAt}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Posts
