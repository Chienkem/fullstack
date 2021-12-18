
import Posts from './Components/posts/Posts.js';
import CreatPost from './Components/createPost/CreatPost.js';
import {useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from './Components/NavBar/Navbar.js';
import User from './Components/UserPost/User';
import Registration from './Components/Create_User/Registration.js';
import Login from './Components/Login/Login.js';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {
const [posts, setPosts] = useState([])
useEffect(()=>{
  axios.get("http://localhost:3001/posts/")
  .then(function (response) {
    setPosts(response.data)
  })
},[])
///////Test


///////////////////////////////////////
const data = JSON.parse(localStorage.getItem('admin') )

function creatStorage(key){
  const store = JSON.parse(localStorage.getItem(key)) || {}
  const save = ()=>{
    localStorage.setItem(key,JSON.stringify(store))
  }
  const storage = {
    get(){
      return store
    },
    set(email){
      store['email'] = email
      save();
    },
  }
  return storage
}
const test = creatStorage('admin')

/////////////////////////////////////////

  return (  
  <div className='App'>
    <Navbar/>
    <Routes>
      <Route path="/posts/byID/:id" element={<User />}/>
      <Route path="/" element={true && <Posts  posts ={posts} />} />
      <Route path="/user/login" element={<Login login={test}/>}/>
      <Route path="/createpost" element={<CreatPost/>}/>
      <Route path="user/registration" element={<Registration create={test}/>}/>
    </Routes>
  </div>

  );
}

export default App;
