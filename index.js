import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book",
  password: password
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    let results = await db.query("SELECT * FROM books");
    results = results.rows
    let result = [];
    if (results.length > 6) {
      results = results.slice(0, 6)
    }
    res.render("index.ejs", {
      results: results
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error")
  }
});

app.get("/add", async (req, res) => {
  res.render("add.ejs");
})

app.get("/random", async(req, res) => {
  try {
    let results = await db.query("SELECT * FROM books");
    results = results.rows
    let randomN = Math.floor(Math.random() * results.length);
    console.log(results[randomN])
    res.render("view.ejs", {
      data: results[randomN]
    })
  } catch (err) {
    console.log(err)
    res.status(500).send("something is wrong with the randomisation")
  }
})

app.post("/add", async (req, res) =>{
  try {
    await db.query("INSERT INTO books(title, ibsn, author, content) VALUES($1,$2,$3,$4)", [req.body.title, req.body.ibsn, req.body.author, req.body.content]);
    res.redirect("/");
  }
  catch (err) {
    console.log(err);
    res.status(500).send("unable to add review");
  }
})

app.post("/view", async (req, res) => {
  try {
    let bookId = req.body.id
    let results = await db.query("SELECT * FROM books WHERE id = $1", [bookId])
    results = results.rows
    res.render("view.ejs", {
      data: results[0]
    })
  } catch (err) {
    console.log(err)
    res.status(500).send("unable to retrieve book review")
  }
})

app.post("/edit", async (req, res) => {
  try {
    if (req.body.content != null) {
      try {
        await db.query("UPDATE books SET title = $1, ibsn = $2, author = $3, content = $4 WHERE id = $5", [req.body.title, req.body.ibsn, req.body.author, req.body.content, req.body.id]);
        let results = await db.query("SELECT * FROM books where id = $1", [req.body.id]);
        results = results.rows
        res.render("view.ejs", {
          data: results[0]
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("error updating post")
      }
    }
    let bookId = req.body.id
    let results = await db.query("SELECT * FROM books where id = $1", [bookId])
    results = results.rows
    res.render("edit.ejs", {
      data: results
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("unable to edit posts");
  }
})

app.post("/delete", async (req, res) => {
  try {
    console.log(req.body.id);
    await db.query("DELETE FROM books WHERE id = $1", [req.body.id]);
    res.redirect("/")
  } catch (err) {
    console.log(err);
    res.status(500).send("unable to delete posts")
  }
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
