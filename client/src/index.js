import React from 'react';
import { render } from 'react-dom';
import App from './app';

import './styles.scss';

const ReactApp = () => {
    return <App />;
}

render(<ReactApp />, document.getElementById('app'));