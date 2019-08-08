const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db, User, Page } = require('./models');


db.authenticate().then(() => {
  console.log('connected to the database');
})

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.send(layout(''));
})



const init = async () => {
    await User.sync({force: true});
    await Page.sync({force: true});
    const PORT = 3000;
app.listen(PORT, () => {
    console.log('Listening on port 3000!');
})
}

init();