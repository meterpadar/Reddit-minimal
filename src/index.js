import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { usePromiseTracker } from "react-promise-tracker";
import { Rings } from 'react-loader-spinner';
import './index.css';
import App from './app/App.js';
import { store } from './app/store.js';
import reportWebVitals from './reportWebVitals';

export const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area});

  return promiseInProgress && 
   <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Rings color="#FA824C" height='100' width='100' />
    </div>
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
