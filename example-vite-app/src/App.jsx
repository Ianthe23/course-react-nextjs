import { useState } from "react";
import Button from "./Button";
import Count from "./Count";

function App() {
  const [number, setNumber] = useState(0);

  return (
    <div className="app">
      {number <= 3 ? <Count number={number} /> : null}
      <Button setNumber={setNumber} />
    </div>
  );
}

export default App;
