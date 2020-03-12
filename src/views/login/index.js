import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <>
                Login
                <button onClick={() => this.props.history.push('home')}>通过函数跳转</button>
            </>
        );
    }
}

export default Login;