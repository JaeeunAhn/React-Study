import socketio from 'socket.io-client'

//socketio를 통한 실시간 통신!

const socket = socketio.connect('https://reactsocketiomo.herokuapp.com/')

export default socket