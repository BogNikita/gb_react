import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Layout from './Layout.jsx';


const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={ Layout } />
            <Route path='/chat/:chatId' render={ (obj) =>
                <Layout chatId={ obj.match.params.chatId } /> } />
            <Route exact path='/profile/:chatId' render={ (obj) =>
                <Layout chatId={ obj.match.params.chatId } />} />
            <Redirect to='/'/>
        </Switch>

    )
}

export default withRouter(Router);