import express from "express";
import { HTMX_KNOWLEDGE } from './data/htmx-info.js';

const app = express()

const port = 3000

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>HTMX Essentials</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"   
      />
      <link rel="icon" href="/icon.png" />
      <script src="/htmx.min.js" defer></script>
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <header id="main-header">
        <img src="/htmx-logo.jpg" alt="HTMX Logo" />
        <h1>Essentials</h1>
      </header>

      <main>
        <p>HTMX is a JavaScript library that you use without writing JavaScript code.</p>
        <!--<button hx-trigger="mouseenter[ctrlKey],click" hx-get="/info" hx-target="main" hx-swap="beforeend">Learn More</button>-->

        <form hx-post="/note" hx-target="ul" hx-swap="outerHTML" hx-select="ul">
          <p>
            <label for="note">Your Note</label>
            <input type="text" id="note" name="note">
          </p>
          <p>
            <button>Save Note</button>
          </p>
        </form>
        <ul>
          ${HTMX_KNOWLEDGE.map(info => `<li>${info}</li>`).join('')}
        </ul>
      </main>
    </body>
  </html>
  
  `)
})

// app.get('/info', (req , res) => {
//   res.send(`

//   `);
// });

app.post('/note', (req , res) => {

  let note = req.body.note;
  HTMX_KNOWLEDGE.push(note);
  // res.send(`
  //   <ul>
  //     ${HTMX_KNOWLEDGE.map(info => `<li>${info}</li>`).join('')}
  //   </ul>
  // `);
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})