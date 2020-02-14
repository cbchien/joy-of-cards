import React, { Component } from "react";
import Button from "../../components/Common/Button";

import userAction from "../../actions/users";

import "./CreateUser.scss";

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

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  async createUser({
    name,
    birthday,
    city,
    country,
    addressLine1,
    addressLine2,
    state,
    zipcode
  }) {
    const res = await userAction.createUser({
      name,
      birthday,
      city,
      country,
      addressLine1,
      addressLine2,
      state,
      zipcode
    });
  }

  render() {
    const { toggleModal } = this.props;
    return (
      <div className="create-user-container">
        <Button onClick={() => toggleModal()}>Create A Users</Button>
      </div>
    );
  }
}

export default CreateUser;
