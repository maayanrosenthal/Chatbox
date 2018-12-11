const express = require('express')
const path = require('path')
const app = express()

const APP_PORT = 5555

// This is config for render view in `views` folder
// and use pug as template engine

const server = app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`)
  })
  
const io = require('socket.io').listen(server)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', function(socket) {
    console.log("user connected.");
    socket.on('chatter', function(message) {
        console.log('message : ' + message);
        io.emit('chatter', message)
    });
  });