import React, { Component } from 'react'
import * as io from 'socket.io-client';

export default class Chat extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    componentDidMount() {
        this.socket = io(process.env.REACT_APP_SOCKET_URL)
        this.runSocket();
    }

    runSocket = () => {
        this.socket.on('welcome', (data) => {
            console.log('at welcome', data)
            this.socket.emit('hi', 'hi from client')
        })
    }

    render() {
        return (
            <>
                <h2>Let's Chat</h2>
                <p>Chat here</p>
            </>
        )
    }
}
