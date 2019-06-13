import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeController } from './views/home'

class AppRoute extends Component {
	render() {
		return (
			<Router>
				<div className="container">
				<Switch>
					<Route exact path="/" component={HomeController} />
				</Switch>
				</div>
			</Router>
		)
	}
}
export default AppRoute