import React from 'react';
import Storage from '../../services/storage';

const Nav = ({ tab, navSetTab }) => {
  const token = Storage.get("token");

  const signOut = () => {
    Storage.remove("user");
    Storage.remove("token");
    navSetTab("Login");
  }

  return (
    <div className="card mb-3 nav">
      <div className="card-header text-light bg-info">
        {tab}
      </div>
      <div className="card-body d-flex">
          {tab !== "Home" && <button onClick={navSetTab.bind(null, "Home")} type="button" className="btn-dark">Home</button>}
          {!token && tab !== "Login" && <button onClick={navSetTab.bind(null, "Login")} type="button" className="btn-dark">Login <span className="glyphicon glyphicon-log-in"></span></button>}
          {!token && tab !== "Registration" && <button onClick={navSetTab.bind(null, "Registration")} type="button" className="btn-dark">Registration</button>}
          {token && tab !== "Workspace" && <button onClick={navSetTab.bind(null, "Workspace")} type="button" className="btn-dark">Workspace</button>}
          <div className="w-100 d-flex justify-content-end">
            {token && <button onClick={signOut} type="button" className="btn-danger justify-flex-end">Sign out</button>}
          </div>
      </div>
    </div>
  );
}

export default Nav;
