import React, { Component } from "react";

import 'element-theme-default';

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<nav className="pull-left">
					<ul>
						<li>
							<a href="#pablo">Home</a>
						</li>
						<li>
							<a href="#pablo">Company</a>
						</li>
						<li>
							<a href="#pablo">Portfolio</a>
						</li>
						<li>
							<a href="#pablo">Blog</a>
						</li>
					</ul>
				</nav>
				<p className="copyright pull-right">
					&copy; {new Date().getFullYear()}{" "}
					Creative Tim, made with love for a better web
					</p>
			</footer>
		)
	};
}

export { Footer };