import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
const posts = [{label:'Hey im freddy!', important: true, like: true}, 
{label:'Hello world!', important: false,like: false}, 
{label:'GG WP', important: false, like: false}];

const App = () => {
    return (
       <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList posts={posts}/>
            <PostAddForm/>
       </div>
    )
}

export default App;