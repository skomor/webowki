import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, ...rest }) => {
    const isAuthed = localStorage.getItem('user')
    console.log(isAuthed, 'dddddddddddddddddddd')
    return (
        <Route {...rest} exact
               render = {(props) => (
                   isAuthed ? (
                           <div>
                               {React.createElement(component, props)}
                           </div>
                       ) :
                       (
                           <Redirect
                               to={{
                                   pathname: '/login',
                                   state: { from: props.location }
                               }}
                           />
                       )
               )}
        />
    )
}