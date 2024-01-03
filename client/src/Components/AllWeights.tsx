import { stringify } from 'querystring';
import React, {useState, useEffect} from 'react';
import { WeightEntry } from '../types';

const AllWeights: React.FC = () => {
  const endpoint = "https://us-west-2.aws.data.mongodb-api.com/app/application-0-luhes/endpoint/scale/all";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<[start:Date, end:Date] | null>(null);
  const [weights, setWeights] = useState<WeightEntry[]>([]);

  const fetchLatest = async () => {
    setIsLoading(true);

    try {
      const response = await(fetch(endpoint, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      }));
      const latestData = await response.json();
      console.log(JSON.stringify(latestData, null, 2))
      setWeights(_weightEntriesFromJSON(latestData));
    } catch (error) {
      return <span style={{color: 'red'}}>Failed</span>
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {fetchLatest()},[]);

  let content:React.ReactNode;
  if(isLoading){
    content = (<span>"Loading..."</span>)
  } else {
    if(weights.length > 0){
      content = (<ul>
        {weights.map(w => <li>{w.timestamp.toLocaleDateString()}: {w.weight} ({w.isMetric ? 'kg' : 'lbs'})</li>)}
      </ul>)
    } else {
      content = <span>No entries</span>
    }
  };

  return <div>{content}</div>
}

const _weightEntriesFromJSON = (json: object[]) => {
  const extractedEntries:WeightEntry[] = [];
  json.forEach(obj => {
    const partialEntry:Partial<WeightEntry> = {
      isMetric: false // default so this key is optional
    };

    Object.entries(obj).forEach(([key, val]) => {
      // If there's a weight key, assign the weight if it's valid, or -1 if it's not a number.
      if(key.toLocaleLowerCase() == 'weight') partialEntry.weight = isNaN(val) ? -1 : Number(val);
      // If there's a metric indicator that's a boolean, use it, otherwise default false
      if(key.toLocaleLowerCase() == 'ismetric') partialEntry.isMetric = typeof val === 'boolean' ? val : false;
      
      // If there's a timestamp, use it when it's castable to a valid date, otherwise return the beginning of time
      const validateDate = ((d:Date) => d instanceof Date && !isNaN(d.valueOf()));
      if(key.toLocaleLowerCase() == 'timestamp') partialEntry.timestamp = validateDate(new Date(val)) ? new Date(val) : new Date(0);
    })

    if(Object.keys(partialEntry).length === 3){
      extractedEntries.push(partialEntry as WeightEntry);
    }
  });
  return extractedEntries;
}

export default AllWeights