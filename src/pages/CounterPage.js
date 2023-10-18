import { useReducer } from "react";
import Button from "../components/Button";
import Panel from "../components/Panel";
import { produce } from "immer";

const INCREMENT_COUNT = "increment";
const SET_VALUE_TO_ADD = "change_value_to-add";
const DECREMENT = "decrement";
const ADD_VALUE_TO_COUNT = "add_value_to_count";

function CounterPage({ initialCount }) {
  //const [count, setCount] = useState(initialCount);
  //const [valueToAdd, setValueToAdd] = useState(0);

  /////////////////// *****  Using reducer  ***** ///////////////////

  const reducer = (state, action) => {
    switch (action.type) {
      case INCREMENT_COUNT:
        // using IMMER we can change the state directly
        state.count = state.count + 1;
        return;
      // return {
      //   ...state,
      //   count: state.count + 1,
      // };
      case DECREMENT:
        state.count = state.count - 1;
        return;

      // return {
      //   ...state,
      //   count: state.count - 1,
      // };
      case SET_VALUE_TO_ADD:
        state.valueToAdd = action.payload;
        return;
      // return {
      //   ...state,
      //   valueToAdd: action.payload,
      // };
      case ADD_VALUE_TO_COUNT:
        state.count = state.count + state.valueToAdd;
        state.valueToAdd = 0;
        return;
      // return {
      //   ...state,
      //   count: state.count + state.valueToAdd,
      //   valueToAdd: 0,
      // };

      default:
        // we can either
        //throw new Error("unexpected action type" + action.type);
        //return state;
        return;
    }
  };

  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    //setCount(count + 1);
    dispatch({
      type: INCREMENT_COUNT,
    });
  };
  const decrement = () => {
    //setCount(count - 1);
    dispatch({
      type: DECREMENT,
    });
  };

  const handleOnchange = (e) => {
    const value = parseInt(e.target.value) || 0;
    //setValueToAdd(value);
    // dealing with numbers (parseInt, || 0, valueToAdd || "")
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setCount(count + valueToAdd);
    //setValueToAdd(0);
    dispatch({
      type: ADD_VALUE_TO_COUNT,
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">Count is {state.count}</h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ""}
          onChange={handleOnchange}
          type="number"
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
