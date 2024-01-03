export type AppState = {
  isFetching: boolean,
  entries: WeightEntry[]
}
export type WeightEntry = {
  timestamp: Date,
  weight: number,
  isMetric: boolean
}