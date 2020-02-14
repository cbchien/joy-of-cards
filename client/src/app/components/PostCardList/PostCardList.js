import React from "react";
import PropTypes from "prop-types";

import "./PostCardList.scss";

const PostCardList = ({ className = "", postCard, index, onClick }) => {
  const {
    date_created,
    expected_delivery_date,
    post_card_id,
    send_date,
    url
  } = postCard;

  return (
    <div
      className={`post-cards-card ${className}`}
      onClick={() => onClick(user)}
    >
      <div className="card-left-section">{index}</div>
      <div className="card-center-section">
        <div><div>id: </div>{post_card_id}</div>
        <div><div>Date Created: </div>{date_created}</div>
        <div><div>Expected Delivery: </div>{expected_delivery_date}</div>
        <div><div>Send: </div>{send_date}</div>
        <div><a href={url}>Preview</a></div>
      </div>
    </div>
  );
};

PostCardList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default PostCardList;
