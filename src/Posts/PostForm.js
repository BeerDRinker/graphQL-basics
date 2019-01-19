import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		onSuccess: PropTypes.func,
		post: PropTypes.instanceOf(Object)
	}

	static defaultProps = {
		post: {},
		onSuccess: () => null
	}

	state = {
		id: this.props.post.id || '',
		title: this.props.post.title || '',
		body: this.props.post.body || '',
	}

	handleInput = e => {
		const formData = {}
		formData[e.target.name] = e.target.value
		this.setState({ ...formData })
	}

	render() {
		const { title, body, id } = this.state
		const { onSubmit, onSuccess } = this.props
		return (
				<form
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit({
							variables: {
								title,
								body,
								id
							}
						}).then(() => {
							onSuccess()
						}).catch((error) => {
							console.log(error)
						})
					}}
					className="PostForm"
				>
				<input
					onChange={this.handleInput}
					name="title"
					value={title}
					type="text"
					placeholder="title"
				/>
				<textarea
					onChange={this.handleInput}
					name="body"
					value={body}
					cols="30"
					rows="10"
					placeholder="body"
				></textarea>
				<button type="submit" >Submit</button>
			</form>
		)
	}
}
