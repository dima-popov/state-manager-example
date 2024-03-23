import { StoreProvider, useSelector, useDispatch, store } from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <ChildA />
      <ChildB />
      <ChildC />
      <ChildD />
    </StoreProvider>
  );
}

function ChildA() {
  console.log("ChildA");
  const state = useSelector((state) => state.value);
  const dispatch = useDispatch();
  return (
    <>
      <div>Child A</div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "decrement", payload: null });
          }}
        >
          -
        </button>
        {state}
        <button
          onClick={() => {
            dispatch({ type: "increment", payload: null });
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

function ChildB() {
  console.log("ChildB");
  const state = useSelector((state) => state.value);
  return <div>{state}</div>;
}

function ChildC() {
  console.log("ChildC");
  const state = useSelector((state) => state.value);
  return <div>{state}</div>;
}

function ChildD() {
  console.log("ChildD");
  return <div>ChildD</div>;
}

export default App;
