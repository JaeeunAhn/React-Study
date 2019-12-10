import React from 'react';
import './App.css';
import ChatForm from './ChatForm'

import socket from './socket'

class App extends React.Component {

    state = {
      // 채팅 내용을 저장하는 곳!, 대화 내용이 쌓이는 곳!
        logs: [] // 전체 대화 내용
    }

    // 여기에 통신을 많이 넣음!!
    componentDidMount() { 
      // 서버에서 주는 데이터를 on 으로 받음
        socket.on('chat-msg', (obj) => { // key 형태로 주고 받고 있는것
            const logs2 = this.state.logs
            obj.key = 'key-' + (this.state.logs.length + 1)
            logs2.unshift(obj) // 맨 앞으로 배열의 상단으로, push 가 맨 뒤로
            this.setState({logs: logs2}) // state 에 바로 푸시하면 안되고 새로운 스테이트 만들어서 보내주기
        })
    }       

    render() {
        const messages = this.state.logs.map(e => (
            <div key={e.key}>
                <span>{e.name}  :  </span>
                <span>{e.message}</span>
            </div>
        ))
        return (
            <div>
                <ChatForm />
                <div>{messages}</div>
            </div>
        )
    }

}

export default App;