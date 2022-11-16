import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import Store from './Store';  //, { Persistor }
// import { PersistGate } from 'redux-persist/integration/react';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic"



const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transitions: transitions.SCALE
}



root.render(

  <BrowserRouter>
    <Provider store={Store}>
      {/* <PersistGate persistor={Persistor}> */}
        <AlertProvider template={AlertTemplate}{...options}>
          <App />
        </AlertProvider>
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
);
