import React from "react";
import PropTypes from "prop-types";

import "./UserList.scss";

const UserList = ({ className = "", user, index, onClick }) => {
  const {
    name,
    address,
    address_city,
    state,
    country,
    birthday_month,
    birthday_day,
    post_card_received
  } = user;

  return (
    <div className={`joy-of-cards-card ${className}`} onClick={() => onClick(user)}>
      <div className="card-left-section">{index}</div>
      <div className="card-center-section">
        <div>{name}</div>
        <div>{`Address: ${address} ${address_city} ${state} ${country}`}</div>
        <div>{`Birthday: ${birthday_month}-${birthday_day}`}</div>
        <div>{`Received Post Cards: ${post_card_received}`}</div>
      </div>
    </div>
  );
};

UserList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  skillLevel: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default UserList;
