import { useState } from "react";

export default function example(count) {
  const [number, setNumber] = useState(4);

  return (
    <div
      onClick={() => {
        setNumber(number + 1);
      }}
    >
      Example
    </div>
  );
}
