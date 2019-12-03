import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'

const axios = require('axios')

class Orders extends React.Component {

	constructor(props) {
		
		super(props)

		this.state = {
			user_id: localStorage.getItem('user_id') || '',
			data: []
		}

	}

	async componentDidMount() {

		// get all orders for the user
		var user_orders

		await axios.get('/api/orders', { port: 5000 })
			.then(res => {

				user_orders = res.data.filter(order => {
					return (order.username === this.state.user_id)
				})

			})

		this.setState({ data: user_orders })

	}

	render() {

		if (this.state.data.length !== 0) {

			let orders_list = this.state.data.sort((order1, order2) => {
				let d1 = new Date(order1.created_at)
				let d2 = new Date(order2.created_at)
				return d1 < d2
			}).map(order => {

				let progressPercentage = 0

				if (order.status === 'Ordered') {
					progressPercentage = 100/6
				}
				else if (order.status === 'Processing') {
					progressPercentage = 200/6
				}
				else if (order.status === 'In Production') {
					progressPercentage = 300/6
				}
				else if (order.status === 'Ready To Ship') {
					progressPercentage = 400/6
				}
				else if (order.status === 'Shipped') {
					progressPercentage = 500/6
				}
				else if (order.status === 'Delivered') {
					progressPercentage = 100
				}

				let updated_at = new Date(order.updated_at)

				const updated_at_text = String(updated_at.toDateString() + ' at ' + updated_at.getHours() + ':' + updated_at.getMinutes())

				return (
					<div key={order.order_number} style={{paddingTop: '1.5em'}}>
						<Row noGutters>
							<h4 style={{marginBottom: '0em'}}>Order #{order.order_number}: {order.status}</h4>
						</Row>
						<Row noGutters>
							<p className="text-muted">Last updated: {updated_at_text}</p>
						</Row>
						<ProgressBar animated variant="success" now={progressPercentage} />
					</div>
				)

			})

			return (
				<Container>
					<Row style={{paddingTop: '1.5em'}}>
						<h3>Order History:</h3>
					</Row>
					<Row>
						<Col>
							{orders_list}
						</Col>
					</Row>
				</Container>
			)

		}
		else {
			return (
				<Container>
					<Row style={{paddingTop: '1.5em'}}>
						<h3>Order History:</h3>
					</Row>
					<Row>
						<Col>
							<h4 style={{paddingTop: '1.5em'}}>You have not placed any orders yet.</h4>
						</Col>
					</Row>
				</Container>
			)
		}

	}

}

export default Orders