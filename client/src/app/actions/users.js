import fetch from "isomorphic-fetch";

const userAction = {
  getUser({ userId }) {
    return fetch(`${process.env.API_URL}/users/${userId}`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        if (res.confirmation && res.confirmation === 'fail') {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  },
  async getUsers() {
    const response = await fetch(`${process.env.API_URL}/users`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
          console.log('getUsers then', res)
        if (res.confirmation && res.confirmation === 'fail') {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log('error', err));
    return response
  },
  createUser({
    name,
    birthday_day,
    birthday_month,
    birthday_year,
    city,
    country,
    addressLine1,
    addressLine2,
    state,
    zipcode
  }) {
    let url = `${process.env.API_URL}/users`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        birthday_day,
        birthday_month,
        birthday_year,
        address_city: city,
        address_country: country,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        address_state: state,
        address_zip_code: zipcode
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.confirmation && res.confirmation === 'fail') {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  },
  updateUser({
    name,
    birthday,
    city,
    country,
    addressLine1,
    addressLine2,
    state,
    zipcode,
    userId
  }) {
    let url = `${process.env.API_URL}/users/${userId}`;
    const requestBody = {};
    if (name) requestBody["name"] = name;
    if (birthday) {
      const birthdayDate = new Date(birthday);
      requestBody["birthday_day"] = birthdayDate.getDay();
      requestBody["birthday_month"] = birthdayDate.getMonth() + 1;
      requestBody["birthday_year"] = birthdayDate.getFullYear();
    }
    if (city) requestBody["address_city"] = city;

    if (country) requestBody["address_country"] = country;
    if (addressLine1) requestBody["address_line_1"] = addressLine1;
    if (addressLine2) requestBody["address_line_2"] = addressLine2;
    if (state) requestBody["address_state"] = state;
    if (zipcode) requestBody["address_zip_code"] = zipcode;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(res => {
        if (res.confirmation && res.confirmation === 'fail') {
          throw res.message;
        } else {
          return res;
        }
      })
      .catch(err => console.log(err));
  }
};

export default userAction;
