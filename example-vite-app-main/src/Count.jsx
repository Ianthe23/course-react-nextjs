import { useEffect } from "react";

export default function Count({ number }) {
  useEffect(() => {
    document.title = `You clicked ${number} times`;
    return () => {
      document.title = "Standard website title";
    };
  }, [number]); // run this whenever number changes

  return <span className="count">{number}</span>;
}
