import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Registration = () => {

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
          {
            axios.post("http://localhost:3001/user/registration",values)
            .then(function (response) {
                alert('tạo thành công')
            })
            .catch(error=>alert(error))
          }
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

      <button class="btnx btn btn-success" type="submit">Đăng kí</button>
    </form>
  );
};
export default Registration;