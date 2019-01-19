import React, { Component, Fragment } from 'react'
import { Query } from "react-apollo";
import gql from 'graphql-tag'

import UpdatePost from '../Posts/UpdatePost'
import EditMode from '../Posts/EditMode'

const POST_QUERY = gql`
  query post($id: ID!){
		post(where: {id: $id }) {
			id
			title
			body
  	}
		isEditMode @client
	}
`;

export default class Post extends Component {
	render() {
		const { id } = this.props.match.params
		return (
			<Query
				query={POST_QUERY}
				variables={{
					id
				}}
			>
				{({ data, loading }) => {
					if(loading) return (<p>Loading...</p>)
					const { post, isEditMode } = data
					return (
						<Fragment>
							<EditMode isEditMode={isEditMode} />
							{ isEditMode
								?
								<section>
									<h4>Edit Post</h4>
									<UpdatePost post={post} />
								</section>
								:
								<section>
									<h2>{post.title}</h2>
									<p>{post.body}</p>
								</section>
							}
						</Fragment>
					)
				}}
			</Query>
		)
	}
}
