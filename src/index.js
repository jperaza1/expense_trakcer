import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import App from './App';
import { Provider } from './context/context';

import './index.css'

ReactDOM.render(
    <SpeechProvider appId='04f72770-a2fe-413a-a30c-9366e7ecdf8a' language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>, 
    document.getElementById('root') 
);