import React, { useState } from "react";

import "../styles/inbox.css";
import Card from "./Card";

const Inbox = () => {
  const [collapsed, setCollapsed] = useState(false);

  const clickHandler = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`inbox ${collapsed ? "collapsed" : ""}`}>
      <div className="u-inbox">
        <h2>Inbox</h2>
        {!collapsed && <button onClick={clickHandler}>c</button>}
        {collapsed && <button onClick={clickHandler}>o</button>}
      </div>

      <div className="l-inbox">
        <Card />
      </div>
    </div>
  );
};

export default Inbox;
