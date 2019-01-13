import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Query } from "react-apollo";
import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      createdAt
    }
}`

export default class Posts extends Component {
	render() {
		return (
			<ul>
				<Query query={POSTS_QUERY}>
					{({ loading, data }) => {
						if(loading) return <h1 className="Loading">Loading...</h1>
						const { posts } = data
						return posts.map(post => (
							<li key={post.id}>
								<Link to={`/post/${post.id}`}>
									<h6>{post.title}</h6>
								</Link>
							</li>)
						)
					}}
				</Query>
			</ul>
		)
	}
}
