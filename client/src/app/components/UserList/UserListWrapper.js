import React from "react";
import PropTypes from "prop-types";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Modal from "../../components/Common/Modal";
import Input from "../../components/Common/Input";
import PostCardList from "../PostCardList/PostCardList";
import postCardsAction from "../../actions/postCards";

import "./UserListWrapper.scss";
import Button from "../Common/Button";

class UserListWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowModal: false,
      selectedUser: {},
      postCards: []
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(isOpen) {
    this.setState({
      isShowModal: isOpen
    });
  }
  selectUser(user) {
    this.setState({
      selectedUser: user
    });
    if (!user || !user.name) return;
    this.getUserPostCard(user.id);
  }
  async sendPostCard(userId) {
    const res = await postCardsAction.sendPostCardTo({ userId });
    if (!res) console.log("Failed to send post card");
  }
  async getUserPostCard(userId) {
    console.log("get user post card");
    const res = await postCardsAction.getPostCardsByUserId({ userId });
    if (!res) console.log("Failed to get post cards");
    else this.setState({ postCards: res });
  }
  render() {
    const { isShowModal, selectedUser, postCards } = this.state;
    const { className, users } = this.props;

    const {
      id: userId,
      address,
      address_city,
      birthday_day,
      birthday_month,
      birthday_year,
      country,
      name,
      post_card_received,
      state,
      zipcode
    } = selectedUser;
    const birthday = new Date(
      `${birthday_year}-${birthday_month}-${birthday_day}`
    );
    return (
      <>
        <CreateUser
          toggleModal={() => {
            this.toggleModal(true);
            this.setState({
                selectedUser: {},
                postCards: []
            })
          }}
        />

        <div className={`user-wrapper ${className}`}>
          {(users && users.length) > 0 &&
            users.map((user, index) => (
              <UserList
                user={user}
                index={index + 1}
                key={`${user.name}-${index}`}
                onClick={user => {
                  this.toggleModal(true);
                  this.selectUser(user);
                }}
              />
            ))}
          {isShowModal && (
            <Modal onDismiss={() => this.toggleModal(false)}>
              <Input value={name} title={"Name"}></Input>
              <Input value={address} title={"Address"}></Input>
              <Input value={address_city} title={"City"}></Input>
              <Input value={country} title={"Country"}></Input>
              <Input value={state} title={"State"}></Input>
              <Input value={zipcode} title={"Zipcode"}></Input>
              <Input value={birthday} title={"Birthday"} type="date"></Input>
              <div>Post card received: {post_card_received}</div>
              {selectedUser && userId && (
                <Button onClick={() => this.sendPostCard(userId)}>
                  Send Post Card
                </Button>
              )}
              {postCards &&
                postCards.length &&
                postCards.map((postCard, index) => (
                  <PostCardList
                    postCard={postCard}
                    index={index}
                    key={postCard.post_card_id}
                  />
                ))}
            </Modal>
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