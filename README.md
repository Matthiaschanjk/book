# The Bookworm
>Readers are leaders!

![Book](https://github.com/Matthiaschanjk/book/assets/90817000/2c05b632-9d3f-42e9-ba5f-fa6b35e18705)


## What's this?
The Bookworm is a book review site that allows users to write reviews about their favourite books. Users can fill in the book title, ibsn, content, and their name for the whole world to see! They can also edit the reviews, delete the reviews and view reviews written by other people. Feeling lost on which books to read next? The site allows for randomizing book reviews so you will never run out of reviews to read!

## Tech-Stack
I used express, node and bootstrap for the front-end and Postgres for the backend.

## How to use this?
1) Clone Repository
2) run npm i
3) create a pgadmin account
4) Create a database called "book" and create a table with the following columns (id SERIAL, ibsn TEXT, author VARCHAR(100), content VARCHAR)
5) Enter your  password in "index.js"
6) run node index.js
