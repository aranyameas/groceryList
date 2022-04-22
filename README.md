# Shopping List

This project is a full-stack react shopping list that has the ability to add, edit, and remove shopping items.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

- ReactJS
- Material-UI
- Golang
- PostgreSQL
- REST

## Instructions

### First clone this repository.

```bash
$ git clone https://github.com/aranyameas/shoppingList
```

### Install dependencies. Make sure you already have golang, nodejs, & npm installed in your system.

```bash
$ cd shoppingList
$ npm install
$ cd src/backend
$ go mod init
$ go mod tidy
```

### Set up local database

I used [pgAdmin4](https://www.pgadmin.org/download/) to create my database.

#### Database Columns Used

| name   | description | quantity | delete | edit | purchased |
| ------ | ----------- | -------- | ------ | ---- | --------- |
| String | String[100] | Int      | Bool   | Bool | Bool      |

### Add a .env file to /shoppingList/src/backend

#### Environment Variables Used

    APP_DB_USERNAME=< Your postgreSQL username >
    APP_DB_PASSWORD=< Your postgreSQL password >
    APP_DB_NAME=< The name of your database >
    APP_DB_PORT=< The port your database is hosted on >
    APP_DB_HOST=< The hostname your database is on (usually localhost) >

### Run your backend

In /shoppingList/src/backend

```bash
go run .
```

### Add a .env file to /shoppingList

#### Environment Variables Used

    REACT_APP_DB_URL=http://localhost:3001
    REACT_APP_GET_ITEMS_URL=http://localhost:3001/items
    REACT_APP_ADD_ITEM_URL=http://localhost:3001/item/add
    REACT_APP_UPDATE_ITEM_URL=http://localhost:3001/item/update
    REACT_APP_DELETE_ITEM_URL=http://localhost:3001/item/delete

### Run your web app

In /shoppingList

```bash
npm start
```
