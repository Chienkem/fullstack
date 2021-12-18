import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './creatpost.css'
const CreatPost = () => {
  const data = JSON.parse(localStorage.getItem('admin') )
  const formik = useFormik({
    initialValues: {
      title: '',
      postText: '',
      username: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(1590, 'Must be 15 characters or less')
        .required('Không được để trống tiêu đề'),
      postText: Yup.string()
        .max(2000, 'Viết nội dung đi chứ')
        .required('Viết nội dung đi chứ'),
      username: Yup.string()
      .required('Không viết tên ai biết')
      .max(2000, 'Không viết tên ai biết')
    }),
    onSubmit: values => {
       if(data){
        axios.post("http://localhost:3001/posts",values)
        .then(()=>{
            console.log(values)
            alert("Đã xong")
        })
        .catch((error)=>{
          alert(error)
        });
       }
       else{
         alert('bạn cần đăng nhập để tạo bài post')
       }
    },
  });
  return (
    <form className='form' onSubmit={formik.handleSubmit}>
    
     <strong htmlFor="title">Tiêu đề</strong>
      <input
        id="title"
        name="title"
        type="text"
        className='input'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div className='error'>{formik.errors.title}</div>
      ) : null}
    

      <strong htmlFor="postText">Nội dung</strong>
      <input
        id="postText"
        name="postText"
        type="text"
        className='input'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.postText}
      />
      {formik.touched.postText && formik.errors.postText ? (
        <div className='error'>{formik.errors.postText}</div>
      ) : null}

      <strong htmlFor="username"> Tên  </strong>
      <input
        id="username"
        name="username"
        type="text"
        className='input'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div className='error'>{formik.errors.username}</div>
      ) : null}

      <button class="btn btn-success " type="submit">Tạo mới</button>
    </form>
  );
};
export default CreatPost