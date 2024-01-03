import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../App';
import { WeightEntry } from '../types';

const AllWeights: React.FC = () => {
  const {appState} = useContext(AppContext);
  const [dateRange, setDateRange] = useState<[start:Date, end:Date] | null>(null);
  const weights = appState.entries;

  let content:React.ReactNode;
  if(appState.isFetching){
    content = (<span>"Loading..."</span>)
  } else {
    if(weights.length > 0){
      content = (<ul>
        {weights.map(w => <li key={w.timestamp.getMilliseconds()}>{w.timestamp.toLocaleDateString()}: {w.weight} ({w.isMetric ? 'kg' : 'lbs'})</li>)}
      </ul>)
    } else {
      content = <span>No entries <pre>{JSON.stringify(appState, null, 2)}</pre></span>
    }
  };

  return <div>{content}</div>
}

export default AllWeights