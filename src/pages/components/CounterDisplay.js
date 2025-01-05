import { useSelector } from "react-redux";

const CounterDisplay = () => {
  const count = useSelector((state) => state.counter.value);
  return <div>Count: {count}</div>;
};

export default CounterDisplay;
