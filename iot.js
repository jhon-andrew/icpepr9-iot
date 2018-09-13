const j5 = require('johnny-five')
const firebase = require('firebase')

const board = new j5.Board()

firebase.initializeApp({
  apiKey: "AIzaSyAE6PAGZckjjlpg1DzfdRqQ8UF7GOMx89w",
  authDomain: "icpepr9-iot.firebaseapp.com",
  databaseURL: "https://icpepr9-iot.firebaseio.com",
  projectId: "icpepr9-iot",
  storageBucket: "icpepr9-iot.appspot.com",
  messagingSenderId: "241420083899"
})

board.on('ready', () => {
  let button = new j5.Button(2)

  button.on('down', () => {
    console.log('The button has been pressed')
    firebase.database().ref('iot-logs').push({
      message: 'the button has been pressed.',
      timestamp: Date.now(),
      color: 'black'
    }).then(() => {
      console.log('Press data has been sent.')
    }).catch(err => {
      console.log('An error occured.', err)
    })
  })

  button.on('up', () => {
    console.log('the button has been released.')
  })

  button.on('hold', () => {
    console.log('the button is on hold.')
  })
})
