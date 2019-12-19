import React, { useState } from 'react';
import Nav from './screens/nav/Nav';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Registration from './screens/Registration/Registration';
import Workspace from './screens/workspace/Workspace';
import Storage from './services/storage';

function App() {
  const [tab, setTab] = useState({tab: Storage.get("tab") || "Home"})

  const navSetTab = (tab) => {
    setTab({tab: tab});
    Storage.set("tab", tab);
  }

  return (
    <div className="App">
      <Nav tab={tab.tab} navSetTab={navSetTab}/>     
      {tab.tab === "Home" && <Home/>}
      {tab.tab === "Login" && <Login navSetTab={navSetTab}/>}
      {tab.tab === "Registration" && <Registration navSetTab={navSetTab}/>}
      {tab.tab === "Workspace" && <Workspace/>}
    </div>
  );
}

export default App;
