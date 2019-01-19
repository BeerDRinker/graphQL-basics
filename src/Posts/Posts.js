import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from "react-apollo";
import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
		posts(orderBy: createdAt_DESC, first: 10, skip: $skip) {
      id
      title
      createdAt
    }
}`

export default class Posts extends Component {
	render() {
		return (
			<ol>
				<Query query={POSTS_QUERY}>
					{({ loading, data, fetchMore }) => {
						if(loading) return <h1 className="Loading">Loading...</h1>
						const { posts } = data
						return (
							<Fragment>
								{posts.map(post => (
										<li key={post.id}>
											<Link to={`/post/${post.id}`}>
												<h6>{post.title}</h6>
											</Link>
										</li>
								))}
								<li>
									<button onClick={() => fetchMore({
										variables: {
											skip: posts.length
										},
										updateQuery: (prev, { fetchMoreResult }) => {
											if(!fetchMoreResult) return prev
											return Object.assign({}, prev, {
												posts: [ ...prev.posts, ...fetchMoreResult.posts ]
											})
										}
									})}>Load More</button>
								</li>
							</Fragment>)
					}}
				</Query>
			</ol>
		)
	}
}
