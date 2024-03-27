import { createContext, useState, useEffect, useContext } from "react";

function createStore(obj) {
  return new (function () {
    this.state = obj.state;
    this.observers = [];
    this.notify = (action) => {
      this.state = obj.reducer({ ...this.state }, action);
      this.observers.forEach((observer) => observer(this.state));
    };

    this.subscribe = (observer) => {
      this.observers.push(observer);
    };

    this.unsubscribe = (observer) => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    };
  })();
}

const store = createStore({ state: { value: 0 }, reducer: reducer });

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

const StoreContext = createContext(null);

function StoreProvider({ children, store }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function useDispatch() {
  const store = useContext(StoreContext);
  return (action) => {
    store.notify(action);
  };
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

export { StoreProvider, useSelector, useDispatch, store };
