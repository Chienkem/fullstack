import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = ({login}) => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
            axios.post(`http://localhost:3001/user/login`,values)
            .then(function (res) {
                console.log(res.data.email =values.email)
                if(res.data.email===values.email){
                    login.set(res.data.email)
                    navigate('/')
                    window.location.reload()
                }
            })
            .catch(error=>alert("mật khẩu không chính xác"))
    },
  });
  return (
    <form  className='form' onSubmit={formik.handleSubmit}>
     <strong htmlFor="email">Tài khoản</strong>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='error'>{formik.errors.email}</div>
      ) : null}

     <strong htmlFor="password">mật khẩu</strong>    
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className='error'>{formik.errors.password}</div>
      ) : null}

      <button className="btnx btn btn-success" type="submit" >Đăng nhập</button>
    </form>
  );
};
export default Login;
