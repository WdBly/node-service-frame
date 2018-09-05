
import React, {Component} from "react";

class HomeComponent extends Component {

    router = () => {
        this.props.history.push("/login");
    }


    render() {
        return (
            <div>
                Home
                <div onClick={this.router}>login12</div>
            </div>
        );
    }
}

export default HomeComponent;