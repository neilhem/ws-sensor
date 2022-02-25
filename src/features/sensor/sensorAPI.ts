import { Sensor } from "./sensorModel";

// A mock function to mimic making an async request for data
export function fetchSensor(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function updateSensor(message: Sensor) {
  return new Promise<{ data: Sensor }>((resolve) =>
    setTimeout(() => resolve({ data: message }), 1000)
  );
}