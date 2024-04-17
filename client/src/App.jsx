import React, { useEffect, useState } from "react";
import { Timeline } from "./Timeline";
import { Dropdown } from "flowbite-react";

const App = () => {
  const [filter1, setFilter1] = useState(0);
  console.log(filter1);
  return (
    <>
      <div className="flex-wrap flex gap-4 justify-between">
        <div className="flex flex-col p-3">Cycle Status</div>
        <div>
          <Dropdown className="mr-3 mt-2"  label="Timeline filter" dismissOnClick={false}>
            <Dropdown.Item onClick={() =>setFilter1(3600)}>last 1hr</Dropdown.Item>
            <Dropdown.Item onClick={() =>setFilter1(3600*8)}>last 8hr</Dropdown.Item>
            <Dropdown.Item onClick={() =>setFilter1(3600*24)}>last 24hr</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="items-center">
        <Timeline filter = {filter1}/>
      </div>
      <div><p>The timestamps is in Coordinated Universal Time (UTC) timezone. </p></div>
    </>
  );
};

export default App;
