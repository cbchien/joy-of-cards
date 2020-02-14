import fetch from "isomorphic-fetch";

const postCardAction = {
  getPostCardsByUserId({ userId }) {
    return fetch(`${process.env.API_URL}/post-card/user/${userId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  },
  getPostCardsById({ postCardId }) {
    return fetch(`${process.env.API_URL}/post-card/${postCardId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  },
  getTotalPostCardCount() {
    return fetch(`${process.env.API_URL}/post-card/count`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  },
  sendPostCardTo({ userId }) {
    return fetch(`${process.env.API_URL}/post-card?receiver=${userId}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  }
};

export default postCardAction;