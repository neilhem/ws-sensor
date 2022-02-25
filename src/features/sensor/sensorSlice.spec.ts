import sensorReducer, {
  SensorState,
} from './sensorSlice';

describe('sensor reducer', () => {
  const initialState: SensorState = {
    sensors: [],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(sensorReducer(undefined, { type: 'unknown' })).toEqual({
      sensors: [],
      status: 'idle',
    });
  });
});