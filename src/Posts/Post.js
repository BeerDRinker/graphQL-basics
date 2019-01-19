import React, { Component, Fragment } from 'react'
import { Query, Mutation } from "react-apollo";
import gql from 'graphql-tag'

import UpdatePost from '../Posts/UpdatePost'
import EditMode from '../Posts/EditMode'

const POST_QUERY = gql`
  query post($id: ID!){
		post(where: {id: $id }) {
			id
			title
			body
			check
  	}
		isEditMode @client
	}
`;

const UDATE_POST = gql`
	mutation updatePost($check: Boolean, $id: ID!) {
		updatePost(
			where: {id: $id}
			data: { check: $check }
		)
		 {
			check
	}
}`

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
								<section className="postTitle">
									<h2>{post.title}</h2>
									<Mutation
										mutation={UDATE_POST}
										variables={{
											id: post.id,
											check: !post.check
										}}
										optimisticResponse={{
											__typename: 'Mutation',
											updatePost: {
												__typename: 'Post',
												check: !post.check
											}
										}}
										update={(cache, { data: { updatePost }}) => {
											const data = cache.readQuery({
												query: POST_QUERY,
												variables: {
													id: post.id
												}
											})
											data.post.check = updatePost.check
											cache.writeQuery({
												query: POST_QUERY,
												data: {
													...data,
													post: data.post,
												}
											})
										}}
									>
										{updatePost => (
											<input 
												type="checkbox"
												checked={post.check}
												onChange={updatePost}
											/>
										)}
									</Mutation>
								</section>
							}
						</Fragment>
					)
				}}
			</Query>
		)
	}
}
