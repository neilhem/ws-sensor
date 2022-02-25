import { useEffect, useState } from 'react';
import { Button, Card, Grid, Loading, Switch, Text } from '@nextui-org/react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectSensorStatus,
  connectionStatus,
  selectSensorList,
  updateSensors,
  updateSensor,
} from './sensorSlice';
import { Sensor } from './sensorModel';
import { debounce } from '../../app/utils';

export function SensorComponent() {
  const status = useAppSelector(selectSensorStatus);
  const sensors = useAppSelector(selectSensorList);
  const dispatch = useAppDispatch();
  const [initialLoad, setInitialLoad] = useState(true);
  
  const socket = new WebSocket('ws://localhost:5000');
  
  useEffect(() => {
    socket.addEventListener('open',  (event) => {
      dispatch(connectionStatus(true));
      setInitialLoad(false);
    });

    // Listen for messages
    socket.addEventListener('message',  (event) => {
      console.log('message', event.data);
      const sensor = JSON.parse(event.data);
      dispatch(updateSensors(sensor));
    });

    return () => {
      dispatch(connectionStatus(false));
      socket.close();
    }
  }, []);


  const handleConnection = (sensor: Sensor) => {
    socket.send(JSON.stringify({ id: sensor.id, command: sensor.connected ? 'disconnect' : 'connect' }));

    dispatch(updateSensor(sensor));
  }

  return (
    <>
      <pre>{JSON.stringify(sensors, null, 2)}</pre>
    </>
  );

  if (status === 'loading' && initialLoad) return <Loading />;
  if (status === 'idle' && !sensors.length) {
    return <p>No sensor data</p>;
  }

  return (
    <>
      <header className="App-header">
        <p>Sensors management</p>
        <div className="App-header-controls">
          Show connected
          <Switch css={{marginLeft: 10, marginRight: 10 }} />

          <Button light color="primary">Show all</Button>
        </div>
      </header>

      <Grid.Container gap={2}>
        {sensors.map((sensor) => (
          <Grid sm={12} md={4} key={sensor.id}>
            <Card css={{  }}>
              <Text h4>{sensor.name}</Text>
              <Text>{ sensor.value } { sensor.unit }</Text>
              <Card.Footer>
                <Button light color="primary" auto onClick={() => handleConnection(sensor)}>
                  {sensor.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
}