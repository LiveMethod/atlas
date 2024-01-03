import React, {createContext, useState, useEffect} from 'react';
import AddWeight from './Components/AddWeight';
import AllWeights from './Components/AllWeights';
import { AppState } from './types';
import weightEntriesFromJSON from './Utils/weightEntriesFromJSON';

const initialState:AppState = {
  isFetching: false,
  entries: []
};

export const AppContext = createContext({
  appState: initialState,
  setAppState: (s:AppState) => {},
  fetchLatest: () => {}
})

function App() {
  let [appState, setAppState] = useState(initialState);

  // Once on mount
  useEffect(() => {fetchLatest()},[]);

  const fetchLatest = async () => {
    setAppState((prevState) => ({...prevState, isFetching: true}));
    
    try {
      const endpoint = "https://us-west-2.aws.data.mongodb-api.com/app/application-0-luhes/endpoint/scale/all";
      const response = await(fetch(endpoint, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      }));
      const latestData = await response.json();
      setAppState((prevState) => ({...prevState, entries: weightEntriesFromJSON(latestData)}));
    } catch (error) {
      return <span style={{color: 'red'}}>Failed</span>
    } finally {
      setAppState((prevState) => ({...prevState, isFetching: false}));
    }
  }

  const context = {
    appState,
    setAppState,
    fetchLatest
  };
  
  // console.log("state before return", appState);

  return (
    <AppContext.Provider value={context}>
      <div className="App">
        <AddWeight/>
        <AllWeights/>
      </div>
    </AppContext.Provider>
  );
}


export default App;
