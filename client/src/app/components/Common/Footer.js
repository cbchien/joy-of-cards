import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Footer.scss'

class Footer extends Component {
	render() {

		return(
			<footer className="joy-of-cards-footer">
				<p className="joy-of-cards-footer__title text-center">Simple React App</p>
				<p className="joy-of-cards-footer__text text-center">
					Built with love <FontAwesomeIcon icon={faHeart} /> by 
					<a href="https://github.com/cbchien"> cbchien <FontAwesomeIcon icon={faGithub}/></a>
				</p>
			</footer>
		)
	}
}

export default Footer; 