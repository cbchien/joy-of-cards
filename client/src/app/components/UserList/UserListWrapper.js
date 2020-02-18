// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import UserList from "./UserList";
import usersAction from "../../actions/users";
import postCardsAction from "../../actions/postCards";

import "./UserListWrapper.scss";
import Button from "../Common/Button";
import UserModal from "../UserModal/UserModal";

class UserListWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowModal: false,
      isInEditModal: false,
      selectedUser: {},
      postCards: []
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  toggleModal({ isOpen, isEditMode }) {
    this.setState({
      isShowModal: isOpen,
      isInEditModal: isEditMode
    });
  }

  handleInput(field, value) {
    const { selectedUser: updatedUserData } = this.state;
    if (field === "birthday") {
      const [birthday_year, birthday_month, birthday_day] = value.split("-");
      updatedUserData["birthday_year"] = birthday_year;
      updatedUserData["birthday_month"] = birthday_month;
      updatedUserData["birthday_day"] = birthday_day;
    } else {
      updatedUserData[field] = value;
    }
    this.setState({
      selectedUser: updatedUserData
    });
  }

  selectUser(user) {
    this.setState({
      selectedUser: user
    });
    if (!user || !user.name) return;
    this.getUserPostCard(user.id);
  }

  async createUser(user) {
    const {
      address,
      name,
      birthday_day,
      birthday_month,
      birthday_year,
      country,
      address_city: city,
      state,
      zipcode
    } = user;
    const { refreshUserList } = this.props;

    await usersAction.createUser({
      name,
      birthday_day,
      birthday_month,
      birthday_year,
      city,
      country,
      addressLine1: address.substring(0, 70),
      addressLine2: address.substring(70),
      state,
      zipcode
    });
    refreshUserList();
    toggleModal({ isOpen: false });
  }

  async updateUser(user) {
    const {
      id,
      address,
      name,
      birthday_day,
      birthday_month,
      birthday_year,
      country,
      address_city: city,
      state,
      zipcode
    } = user;

    usersAction.updateUser({
      userId: id,
      name,
      birthday_day,
      birthday_month,
      birthday_year,
      city,
      country,
      addressLine1: address.substring(0, 70),
      addressLine2: address.substring(70),
      state,
      zipcode
    });
  }

  async sendPostCard(userId) {
    const { refreshUserList } = this.props;
    await postCardsAction
      .sendPostCardTo({ userId })
      .then(() => {
        refreshUserList();
        this.getUserPostCard(userId);
      })
      .catch(err => console.log("Failed to send post card", err));
  }

  async getUserPostCard(userId) {
    await postCardsAction.getPostCardsByUserId({ userId }).then(res => {
      this.setState({ postCards: res });
    })
    .catch(err => console.log("Failed to get post cards", err));;
  }

  render() {
    const { isInEditModal, isShowModal, selectedUser, postCards } = this.state;
    const { className, users } = this.props;

    return (
      <>
        <div className="create-user-container">
          <Button
            onClick={() => {
              this.toggleModal({ isOpen: true, isEditMode: false });
              this.setState({
                selectedUser: {},
                postCards: []
              });
            }}
          >
            Create A Users
          </Button>
        </div>

        <div className={`user-wrapper ${className}`}>
          {(users && users.length) > 0 &&
            users.map((user, index) => (
              <UserList
                user={user}
                index={index + 1}
                key={`${user.name}-${index}`}
                onClick={user => {
                  this.toggleModal({ isOpen: true, isEditMode: true });
                  this.selectUser(user);
                }}
              />
            ))}
          {isShowModal && (
            <UserModal
              onDismiss={() => this.toggleModal({ isOpen: false })}
              handleInput={(field, value) => this.handleInput(field, value)}
              isInEditModal={isInEditModal}
              postCards={postCards}
              updateUser={user => this.updateUser(user)}
              createUser={user => this.createUser(user)}
              sendPostCard={userId => this.sendPostCard(userId)}
              user={selectedUser}
            />
          )}
        </div>
      </>
    );
  }
}
UserListWrapper.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  users: PropTypes.array
};

export default UserListWrapper;
