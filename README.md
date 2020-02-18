# joy-of-cards

Python Flask Exercise

```
├── client
│ ├── config
│ ├── src
│ │ ├── app
│ │ │ ├── actions <- services to backend API
│ │ │ ├── components
│ │ │ └── containers
│ │ ├── \_variables.scss <- Global styling
│ │ ├── index.html <- SPA
│ │ ├── index.js <- React App
│ │ └── styles.scss <- Global styling
│ ├── server.js
│ ├── route.js
│ └── path.js
└── server
├── migrations
├── resources <- TODO: refactor API modules
├── app.py <- Flask app setting. Current contains API routes
├── config.py
├── cron.py <- Cron task to send birthday post cards
├── lobUtils.py <- TODO: Restructure this file to live under Utils
└── models.py <- This file can be broken into seperate files
```

Datebase:

```
sudo su - postgres -c "createdb joy_of_cards"

```

Backend:

```
cd server && source env/bin/activate
pip install requirements.txt
FLASK_APP=app.py flask run
```

Also note that there is an API key required for sending post cards from [Lob](https://lob.com/)

Frontend:

```
cd client
npm install
```

For developement `npm run dev`
For production `npm prestart:prod && npm run start`

## API

- [POST] create user
- [PUT] update user
- [GET] all users
- [GET] user by userId
- [GET] postcard received by userId
- [POST] send a postcard immediately
- [GET] postcard detail by postCardId
- [GET] total postcard sent to date

## Cron

A cron job will run every day to send a postcard to birthday users

## TODO

Backend:

Integrate Logger

- Add more meaningful HTTPS response status and JSON body
- Refactor folder structure
- Add database initializer
- Customize/Randomize post card style instead of hard coded url
- Throttle the post card creation api call to Lob
- Split current User table to User + Address with one-to-one relationship

Frontend:

- Add modal form input handler and validations
- Fix date input value
- Add typedefs
- Refactor to jsx
- Create a middleware for isomorphic-fetch
- Refactor styling and UI
- Add animation and response messages for different action

Others:

- Add instruction to run
- deployment
- Update README with API route and example usage
- Add README screenshots
