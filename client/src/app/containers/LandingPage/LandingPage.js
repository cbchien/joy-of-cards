import React, { Component } from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";

import UserListWrapper from "../../components/UserList/UserListWrapper";

import userAction from "../../actions/users";
import postCardsAction from "../../actions/postCards";


const DUMMY_USER = {
  name: `NEw Guy ${Math.random()}`,
  birthday: new Date("1990-01-09"),
  city: "some city",
  country: "some country",
  addressLine1: "first addresss",
  addressLine2: "second address",
  state: "WA",
  zipcode: "12345"
};

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      totalPostCardSent: 0
    };
  }
  componentDidMount() {
    this.getUsers();
    this.getPostCardCount();
  }

  async getUsers() {
    const res = await userAction.getUsers();
    if (res) this.setState({ users: res });
  }

  async getPostCardCount() {
    const res = await postCardsAction.getTotalPostCardCount();
    if (res) this.setState({ totalPostCardSent: res.total });
  }

  render() {
    const { users, totalPostCardSent } = this.state;
    return (
      <div className="joy-of-cards-landing-page">
        <Header />
        <div>Total Sent: {totalPostCardSent}</div>
        <UserListWrapper users={users} />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
