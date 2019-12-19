import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Api from '../../Api/Api';

const Registration = ({ navSetTab }) => {
  const [user, setUser] = useState({ username: "", lastname: "", email: "", password: "" });
  const [note, setNote] = useState({ incorrectData: false, empty: false });

  const onHandleChange = e => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
    
  }
  
  const onRegister = user => {
    if (user.username && user.lastname && user.email && user.password) {
      Api.people.postRegister(user)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        else {
          navSetTab("Login");
        }
        return res.json();
      })
      .catch(() => {
        setNote({ incorrectData: true, empty: false });     
      })
    }
    else {
      setNote({ incorrectData: false, empty: true })
    }
  }
  
  return (
    <div className="myForm d-flex flex-column justify-content-center align-items-center position-relative" style={{ height: '590px' }}>
      <div className="form-div text-center text-light">
        <Input id="username" name="Username" type="text" onHandleChange={onHandleChange} />
        <Input id="lastname" name="Lastname" type="text" onHandleChange={onHandleChange} />
        <Input id="email" name="Email" type="email" onHandleChange={onHandleChange} />
        <Input id="password" name="Password" type="password" onHandleChange={onHandleChange} />
        <button onClick={onRegister.bind(null, user)} type="submit" className="btn btn-primary">Submit</button>
      </div>
      <div className="position-absolute" style={{ bottom: '0' }}>
        {note.incorrectData && <div className="alert alert-danger mb-0" role="alert">Please make sure all required fields are filled out correctly</div>}
        {note.empty && <div className="alert alert-danger mb-0" role="alert">Please fill in all required fields</div>}
      </div>
    </div>
  );
}

export default Registration;
