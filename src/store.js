import { createContext, useState, useEffect, useContext } from "react";

const store = {
  state: { value: 0 },
  observers: [],
  notify(action) {
    this.state = reducer({ ...this.state }, action);
    this.observers.forEach((observer) => observer(this.state));
  },
  subscribe(observer) {
    this.observers.push(observer);
  },

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  },
};

const StoreContext = createContext(store);

function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      state.value += 1;
      break;
    case "decrement":
      state.value -= 1;
      break;
    default:
      break;
  }

  return state;
}

function dispatch(action) {
  store.notify(action);
}

function useSelector(selectFunc = (arg) => arg) {
  const store = useContext(StoreContext);
  const [state, setState] = useState(selectFunc(store.state));

  const observer = (state) => {
    setState(selectFunc(state));
  };

  useEffect(() => {
    store.subscribe(observer);
    return () => {
      store.unsubscribe(observer);
    };
  }, []);

  return state;
}

export { StoreProvider, useSelector, dispatch };
