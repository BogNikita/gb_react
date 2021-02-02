import React from 'react';
import ReactDom from 'react-dom';

import Layout from './components/Layout.jsx';
import './style/message.css';
import './style/grid-container.css';

ReactDom.render(
    <Layout/>,

    document.getElementById('root')
);