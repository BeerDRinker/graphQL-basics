import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'

import './App.css';

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjqtmixrn1qq301hq6lctjuab/master'
})

// client.query({
//   query: testQuery
// }).then(res => console.log(res))

class App extends Component {
 
  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default App;
