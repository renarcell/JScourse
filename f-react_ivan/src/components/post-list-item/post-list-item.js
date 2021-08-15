import React, {Component} from 'react';

import './post-list-item.css';

class PostListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            important: props.important,
            like: props.like
        }
        this.toggleImportant = () => {
            this.setState(state => {
                return {
                    important: !state.important,
                }
            })
        }

        this.toggleLike = () => {
            this.setState(state => {
                return {
                    like: !state.like,
                }
            })
        }
    }

    

    render() {
        const {postText} = this.props;
        const {important, like} = this.state;
        let liClasses = "app-list-item d-flex justify-content-between";
        if (important) {
            liClasses += ' important';
        }
        if (like) {
            liClasses += ' like';
        }

    return (
        <li className={liClasses}
        >
            <span className="app-list-item-label" onClick={this.toggleLike}>
                {postText}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn-star btn-sm" onClick={this.toggleImportant}>
                    <i className="fa fa-star" ></i>
                </button>
                <button className="btn-trash btn-sm" >
                    <i className="fa fa-trash-o"></i>
                </button>
                <i className="fa fa-heart"></i>
            </div>
        </li>
    )
    }
}

export default PostListItem;