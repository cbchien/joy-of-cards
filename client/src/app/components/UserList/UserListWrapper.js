import React from "react";
import PropTypes from "prop-types";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Modal from "../../components/Common/Modal";

import "./UserListWrapper.scss";

class UserListWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowModal: false,
      selectedUser: undefined
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    const { isShowModal } = this.state;
    this.setState({
      isShowModal: !isShowModal
    });
  }
  selectUser(user) {
    this.setState({
      selectedUser: user
    });
  }
  render() {
    const { isShowModal, selectedUser } = this.state;
    const { className, users } = this.props;
    return (
      <>
        <CreateUser
          toggleModal={() => {
            this.toggleModal();
            this.selectUser(null);
          }}
        />

        <div className={`user-wrapper ${className}`}>
          {(users && users.length) > 0 &&
            users.map((user, index) => (
              <UserList
                user={user}
                index={index + 1}
                key={`${user.name}-${index}`}
                onClick={user => this.selectUser(user)}
              />
            ))}
          {isShowModal && (
            <Modal onDismiss={() => this.toggleModal()}>
              <div>{selectedUser.name}</div>
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
