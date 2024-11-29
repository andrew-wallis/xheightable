function createStore(initialData) {

  let data = {...initialData};
  let listeners = [];

  function getData() {
    return data;
  }

  function setData(newData) {
    data = {...data, ...newData};
    notify();
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  function notify() {
    listeners.forEach(listener => listener());
  }

  return {
    getData,
    setData,
    subscribe
  }

}

export default createStore;