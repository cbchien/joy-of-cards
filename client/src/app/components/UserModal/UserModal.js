import React from "react";
import PropTypes from "prop-types";
import Modal from "../../components/Common/Modal";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import PostCardList from "../PostCardList/PostCardList";

import "./UserModal.scss";

const UserModal = ({
  user,
  onDismiss,
  handleInput,
  isInEditModal,
  postCards,
  updateUser,
  createUser
}) => {
  const {
    id: userId,
    address = '',
    address_city = '',
    birthday_day = '',
    birthday_month = '',
    birthday_year = '',
    country = '',
    name = '',
    post_card_received,
    state,
    zipcode
  } = user;
  const birthday = `${birthday_year}-${
    birthday_month < 10 ? `0${Number(birthday_month)}` : birthday_month
  }-${birthday_day}`;

  return (
    <Modal onDismiss={onDismiss}>
      <Input
        value={name}
        title={"Name"}
        onChange={e => handleInput("name", e.target.value)}
      />
      <Input
        value={address}
        title={"Address"}
        onChange={e => handleInput("address", e.target.value)}
      />
      <Input
        value={address_city}
        title={"City"}
        onChange={e => handleInput("address_city", e.target.value)}
      />
      <Input
        value={country}
        title={"Country"}
        maxLength="8"
        onChange={e => handleInput("country", e.target.value)}
      />
      <Input
        value={state}
        title={"State"}
        onChange={e => handleInput("state", e.target.value)}
      />
      <Input
        value={zipcode}
        title={"Zipcode"}
        onChange={e => handleInput("zipcode", e.target.value)}
      />
      <Input
        value={birthday}
        title={"Birthday"}
        type="date"
        onChange={e => handleInput("birthday", e.target.value)}
      />
      {isInEditModal && <div>Post card received: {post_card_received}</div>}

      {user && userId && (
        <Button onClick={() => sendPostCard(userId)} className="secondary">
          Send Post Card
        </Button>
      )}

      {isInEditModal && (
        <Button onClick={() => updateUser(user)}>Update User</Button>
      )}

      {!isInEditModal && (
        <Button onClick={() => createUser(user)}>Create User</Button>
      )}

      {postCards &&
        postCards.length > 0 &&
        postCards.map((postCard, index) => (
          <PostCardList
            postCard={postCard}
            index={index + 1}
            key={postCard.post_card_id}
          />
        ))}
    </Modal>
  );
};

UserModal.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default UserModal;
