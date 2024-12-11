export default function Button({ setNumber }) {
  return (
    <button
      onClick={() => {
        // setNumber(number + 1);
        setNumber((prev) => prev + 1);
      }}
    >
      +
    </button>
  );
}
