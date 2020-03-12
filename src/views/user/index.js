import React, {Component} from 'react';

class User extends Component {
    render() {
        return (
            <>
                User
                <button onClick={() => this.props.history.push('')}>通过函数跳转</button>
            </>
        );
    }
}

export default User;