import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'

const axios = require('axios')

class Orders extends React.Component {

	constructor() {
		
		super()

		// TODO: get username or an id from the passport session
		this.state = {
			user_id: 1234,
			data: []
		}

	}

	async componentDidMount() {

		// get all orders for the user
		var user_orders

		await axios.get('/api/orders', { port: 5000 })
			.then(res => {

				user_orders = res.data.filter(order => {
					return (order.user_id === this.state.user_id)
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

				let progressPercentage = 33

				if (order.status === 'In Progress') {
					progressPercentage = 66
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
					{orders_list}
				</Container>
			)

		}
		else {
			return (
				<Container>
					<h4 style={{paddingTop: '1.5em'}}>No orders!</h4>
				</Container>
			)
		}

	}

}

export default Orders