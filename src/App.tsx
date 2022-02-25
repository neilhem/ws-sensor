import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';

import './App.css';
import { store } from './app/store';
import { SensorComponent } from './features/sensor/Sensor';

function App() {

  return (
    <Provider store={store}>
      <NextUIProvider>
        <div className="App">
          <SensorComponent />
        </div>
      </NextUIProvider>
    </Provider>
  );
}

export default App;
