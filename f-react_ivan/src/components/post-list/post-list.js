import React from 'react';

import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts}) => {
    let postsList = posts.map(({label, important, like}) => {
        return (
            <li className='list-group-item'>
                <PostListItem 
                postText={label}
                important={important}
                like={like} />
            </li>

        )
    });
    return (
        <ul className = "app-list list-group">
            {postsList}
            {/* <PostListItem />
            <PostListItem />
            <PostListItem /> */}
        </ul>
    )
}

export default PostList;