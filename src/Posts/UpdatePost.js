import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import gql from 'graphql-tag'

import PostForm from './PostForm'

const UDATE_POST = gql`
	mutation updatePost($id: ID!, $title: String!, $body: String!) {
		updatePost(
			where: {id: $id}
			data: { status: PUBLISHED, title: $title, body: $body}
			) {
			id,
			title,
			body
	}
}`

export default class UpdatePost extends Component {
	render() {
		const { post } = this.props
		return (
			<Mutation mutation={UDATE_POST}>
				{(updatePost, result) => {
					const onSuccess = () => 
						result.client.writeData({ data: { isEditMode: false } })
					return <PostForm post={post} onSuccess={onSuccess} onSubmit={updatePost} />
				}}
			</Mutation>
		)
	}
}
