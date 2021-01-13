import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions/user_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const {username, password, submitted} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Logowanie</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Nazwa użytkownika</label>
                        <input type="text" className="form-control" name="username" value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&
                        <div className="help-block">Nazwa użytkownika jest wymagana</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Hasło</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.handleChange}/>
                        {submitted && !password &&
                        <div className="help-block">Hasło jest wymagane</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Zaloguj</button>
                        <Link to="/register" className="btn btn-link">Zarejestruj się</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn, loggedIn} = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

export default connect(mapStateToProps)(LoginPage);

