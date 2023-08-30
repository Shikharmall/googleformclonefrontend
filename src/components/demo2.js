import React, { useState } from 'react';

function InputForm() {
  const [inputArrays, setInputArrays] = useState([['']]); // Initial array of array with one input

  const handleInputChange = (arrayIndex, inputIndex, value) => {
    const newInputArrays = [...inputArrays];
    newInputArrays[arrayIndex][inputIndex] = value;
    setInputArrays(newInputArrays);
  };

  const handleAddInput = (arrayIndex) => {
    const newInputArrays = [...inputArrays];
    newInputArrays[arrayIndex].push('');
    setInputArrays(newInputArrays);
  };

  const handleAddArray = () => {
    setInputArrays([...inputArrays, ['']]);
  };

  return (
    <div>
      {inputArrays.map((inputArray, arrayIndex) => (
        <div key={arrayIndex}>
          {inputArray.map((input, inputIndex) => (
            <input
              key={inputIndex}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(arrayIndex, inputIndex, e.target.value)}
            />
          ))}
          <button onClick={() => handleAddInput(arrayIndex)}>Add Input</button>
        </div>
      ))}
      <button onClick={handleAddArray}>Add Array</button>
    </div>
  );
}

export default InputForm;
