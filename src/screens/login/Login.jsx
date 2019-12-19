import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Api from '../../Api/Api';
import Storage from '../../services/storage';

const Login = ({ navSetTab }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [note, setNote] = useState({ unauthorized: false, empty: false });

  const onHandleChange = e => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  }

  
  const onLogin = user => {
    if (user.email && user.password) {
      Api.people.postLogin(user)
        .then(res => {
          if (!res.ok) {
            throw new Error()
          }
          return res.json()
        })
        .then(data => {
          Storage.set("user", data.userId);
          Storage.set("token", data.id);
          navSetTab("Workspace");
        })
        .catch(() => {
          setNote({ unauthorized: true, empty: false });
        })
    }
    else {
      setNote({ unauthorized: false, empty: true })
    }
  }

  const pressKey = (e) => {
    if(e.charCode === 13) {
      onLogin(user)
    } 
  }
  
  return (
    
    <div className="myForm d-flex flex-column justify-content-center align-items-center position-relative" style={{ height: '450px' }}>
      <div className="form-div text-center text-light">
        <Input id="email" name="Email" type="email" onKeyPress={pressKey} onHandleChange={onHandleChange} />
        <Input id="password" name="Password" onKeyPress={pressKey} type="password" onHandleChange={onHandleChange} />
        <button onClick={onLogin.bind(null, user)} type="submit" className="center-block btn btn-primary">Submit</button>
      </div>
      <div className="position-absolute" style={{ bottom: '0' }}>
        {note.unauthorized && <div className="alert alert-danger mb-0" role="alert">Failed to log in. Wrong email or password</div>}
        {note.empty && <div className="alert alert-danger mb-0" role="alert">Please enter your email and password</div>}
      </div>
    </div>
  )
}

export default Login
