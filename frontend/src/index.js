import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';

import App from './App';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container); // for React 18+

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </Provider>
);
