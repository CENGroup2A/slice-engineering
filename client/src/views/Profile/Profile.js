import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Orders from '../../components/Orders'

class Profile extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			user_id: localStorage.getItem('user_id') || ''
		}
	}

	render() {

		return (
			<Container style={{paddingTop: '1.5em'}}>
				<Row>
					<h3>Profile</h3>
				</Row>
				<Row>
					<Col>
						<Row>
							<p>[Name]</p>
						</Row>
						<Row>
							<p>Email: [Email]</p>
						</Row>
					</Col>
				</Row>
				<Row style={{paddingTop: '1.5em'}}>
					<h3>Order History:</h3>
				</Row>
				<Row>
					<Col>
						<Orders user_id={this.state.user_id} />
					</Col>
				</Row>
			</Container>
		)

	}

}

export default Profile