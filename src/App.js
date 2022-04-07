import React, { useEffect, useState } from "react";

import TabletForm from "./Components/TabletForm";
import DisplayForm from "./Components/DisplayForm";

import Nala from "./api/Nala";

function App() {
  const [timeValue, setTimeValue] = useState(0);
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    // when this component loads then the fields will be populated
    getUser()
  }, [])

  const getUser = async () => {
    try {
      alert("get user has ran")
      // get a random user from the database and populate the fields
      const res = await Nala.post("/getUser");
      setPersonName(res.data.user.name)
      setTimeValue(res.data.user.time)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <TabletForm getUser={getUser} />
        <DisplayForm timeValue={timeValue} personName={personName} />
      </header>
    </div>
  );
}

export default App;
