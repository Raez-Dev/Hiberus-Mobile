//  Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

//  Context
import { LSContext } from '../../../Context/LSContext';

//  Services
import authService from '../../../Services/authService';
import { useUseService } from '../../../Services/userService';

const Login = () => {

  const [UserForm, setUserForm] = useState({ email: '', password: '' });
  const [ReadyToGo, setReadyToGo] = useState(false);
  const { saveLS,saveUser } = useContext(LSContext);
  const { userService } = useUseService();
  const Navigate = useNavigate();

  useEffect(() => {
    if (Object.values(UserForm).length === Object.values(UserForm).reduce((p, c) => c !== '' ? p + 1 : p, 0)) {
      setReadyToGo(true)
    } else {
      setReadyToGo(false)
    }
  }, [UserForm])

  const onHandleInputChange = (e) => {
    e.preventDefault();
    setUserForm({ ...UserForm, [e.target.name]: e.target.value })
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const response = await authService.login(UserForm);

    if (response.statusCode === 200) {
      
      saveLS({ accessToken: response.accessToken, refreshToken: response.refreshToken, tokenType: response.tokenType })

      const responseMe = await userService.getMe(response.accessToken);

      if (responseMe.statusCode === 200) {
        saveUser({name: responseMe.name,surname: responseMe.surname})
        Navigate('');
      } else {
        Swal.fire({
          icon: 'error',
          title: `${response.error}`,
          html: `${response.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: `${response.error}`,
        html: `${response.message}`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  return (

    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container-md">
        <div className="card login-card">
          <div className="row no-gutters px-3">
            <div className="col-md-7">
              <video preload="none" style={{ width: '100%', height: '100%' }} autoPlay={true} loop muted>
                <source src="https://www.hiberus.com/sites/default/files/video-thumbnails/2020-07/cabecera_hiberus.mp4" />
              </video>
            </div>
            <div className="col-md-5">
              <div className="card-body">
                <div className="brand-wrapper fs-3 ">
                  Hiberus
                </div>
                <p className="login-card-description">Login to Hiberus</p>
                <form onSubmit={onHandleSubmit} className="row g-3">
                  <div className="col-md-12">
                    <label htmlFor="email" className="visually-hidden">Email</label>
                    <input className='form-control' type="text" name="email" placeholder='Email' value={UserForm.email} onChange={onHandleInputChange} />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                    <input autoComplete='off' className='form-control' type="password" name="password" placeholder='Password' value={UserForm.password} onChange={onHandleInputChange} />
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-primary mb-3" type='submit' disabled={!ReadyToGo} >Log In</button>
                  </div>
                </form>
                <p className="login-card-footer-text">Don't have an account? <NavLink to={`/signup`}>Sign up</NavLink></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Login;