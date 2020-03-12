import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <>
                Home
                <button onClick={() => this.props.history.push('user')}>通过函数跳转</button>
            </>
        );
    }
}

export default Home;