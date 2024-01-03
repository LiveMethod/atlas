import { WeightEntry } from "../types";

const weightEntriesFromJSON = (json: object[]) => {
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

export default weightEntriesFromJSON;
