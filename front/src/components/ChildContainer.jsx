import React, { useState } from "react";
import axios from "axios";

const ChildContainer = ({
  name,
  addCount,
  updateCount,
  textData,
  fetchData,
  handleAddData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTextData, setUpdatedTextData] = useState(textData);

  const handleEdit = () => {
    const updatedData = prompt("Enter the updated text data:", textData);
    if (updatedData && updatedData.trim().length > 0) {
      axios
        .put("http://localhost:3000/api/update", { textData: updatedData })
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      alert("Please enter valid text data.");
    }
  };

  const handleSave = () => {
    axios
      .put("http://localhost:3000/api/update", { textData: updatedTextData })
      .then(() => {
        fetchData();
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleInputChange = (event) => {
    setUpdatedTextData(event.target.value);
  };

  return (
    <div className={`child ${name}`}>
      {editMode ? (
        <>
          <textarea value={updatedTextData} onChange={handleInputChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {textData ? (
            <>
              <p>
                Text Data: {textData}
                <button onClick={handleEdit}>Edit</button>
              </p>
              <p>Add Count: {addCount}</p>
              <p>Update Count: {updateCount}</p>
            </>
          ) : (
            <>
              <p>No text data available.</p>
              <button onClick={handleAddData}>Add Data</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChildContainer;
