import React, {Component} from 'react'
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';

import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

class LandingPage extends Component{
	render() {
        return(
			<div className="joy-of-cards-landing-page">
				<Header />
                Welcome
                <Button onClick={()=>{}}>Click Me</Button>
                <Input />
				<Footer />
			</div>
		)
	}
}

export default LandingPage;
