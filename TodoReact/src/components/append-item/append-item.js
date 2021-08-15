import React, {Component} from 'react';
import { render } from 'react-dom';

import './append-item.css';

export default class AppendItem extends Component {

    state = {
        inputVal: ''
    }

    onInputChange = (e) => {
        const text = e.target.value;
        this.setState({
            inputVal: text
        })
    }

    clearState = () => {
        this.setState({
            inputVal: ''
        });
    }

    render() {
        const {onAppend} = this.props;
        return (
        <form className="append-form d-flex"
        onSubmit={(e) => {
            e.preventDefault();
           onAppend(this.state.inputVal);
           this.clearState();
           }}>
            <input className="form-control append-input"
             type="text" 
             placeholder="I want..."
             value={this.state.inputVal}
             onChange={this.onInputChange} />
             <button
             className="btn btn-info">Add</button>
        </form>
        );
    };
}