import React, { useState, useEffect } from "react";
import axios from "axios";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Layout.css";
import ChildContainer from "./ChildContainer";

const Layout = () => {
  const [textData, setTextData] = useState("");
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const fetchData = async () => {
    try {
      const [dataResponse, countResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/data"),
        axios.get("http://localhost:3000/api/count"),
      ]);
      setTextData(dataResponse.data.textData);
      setAddCount(countResponse.data.addCount);
      setUpdateCount(countResponse.data.updateCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddData = async () => {
    const newData = prompt("Enter the text data:");
    if (newData && newData.trim().length > 0) {
      try {
        await axios.post("http://localhost:3000/api/add", {
          textData: newData,
        });
        fetchData();
      } catch (error) {
        console.error("Error adding data:", error);
      }
    } else {
      alert("Please enter valid text data.");
    }
  };

  return (
    <div className="container">
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal" className="hori">
            <Panel defaultSize={20} minSize={20} maxSize={75}>
              <ChildContainer
                number={1}
                name="child1"
                textData={textData}
                addCount={addCount}
                updateCount={updateCount}
                fetchData={fetchData}
                handleAddData={handleAddData}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50} minSize={20} maxSize={75}>
              <ChildContainer
                number={2}
                name="child2"
                textData={textData}
                addCount={addCount}
                updateCount={updateCount}
                fetchData={fetchData}
                handleAddData={handleAddData}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={40} minSize={20} maxSize={75}>
          <ChildContainer
            number={3}
            name="child3"
            textData={textData}
            addCount={addCount}
            updateCount={updateCount}
            fetchData={fetchData}
            handleAddData={handleAddData}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;
