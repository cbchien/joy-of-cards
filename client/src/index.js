import React from 'react';
import { render } from 'react-dom';

import './styles.scss';

const App = () => {
    return (
        <div>
            <h1>Post Card Dashboard</h1>
            <p>See a list of users here</p>
        </div>
    );
}

render(<App />, document.getElementById('app'));