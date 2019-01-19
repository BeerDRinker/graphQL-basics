import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'

import './App.css';

class App extends Component {
 
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Link to="/"><h4>Home</h4></Link>
              <Link to="/post/new"><h4>New Post</h4></Link>

              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/post/new" component={NewPost} />
                <Route path="/post/:id" component={Post} />
                
              </Switch>
            </header>
          </div>
        </Router>
    );
  }
}

export default App;
