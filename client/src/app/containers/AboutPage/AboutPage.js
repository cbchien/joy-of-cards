import React, { Component } from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";

import "./AboutPage.scss";

class AboutPage extends Component {
  render() {
    return (
      <div className="joy-of-cards-landing-page">
        <Header />
        <article className="joy-of-cards-about-page__article">
          <h1>About the Page</h1>
          <p>
            This is a simple dashboard that connects to{" "}
            <a href="https://dashboard.lob.com/">Lob</a> to send out post cards.
          </p>
          <p>
            You can select a user to send them a post card immediately. The
            users will also receive a automatic birthday post card as well! Feel
            free to add yourself to the list and also your friends!
          </p>
        </article>

        <article className="joy-of-cards-about-page__article">
          <h1>About the Developer</h1>
          <p>
            This is an simple exercise that uses React as a frontend interface.
            The backend API are designed using Python Flask connecting to
            postgres.
          </p>
        </article>
        <Footer />
      </div>
    );
  }
}

export default AboutPage;
