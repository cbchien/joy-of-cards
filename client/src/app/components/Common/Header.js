
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

class Heading extends Component {
    constructor(props) {
        super(props);
    }

	render() {
		return (
			<header className="joy-of-cards-header">
                <span className="joy-of-cards-header__title">Joy of Cards</span>
                <div className="joy-of-cards-header__nav">
                    <Link to="/" className="joy-of-cards-header__nav-item">Home</Link>
                    <Link to="/about" className="joy-of-cards-header__nav-item">About</Link>
                </div>
			</header>
		)
	}
}

export default Heading;