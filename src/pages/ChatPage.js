import axios from 'axios';
import React, { Component } from 'react';
import API_URL from '../config';
import io from "socket.io-client";
import {Container, Grid } from '@material-ui/core';
import Navbar from '../components/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';


let socket = ''

class ChatPage extends Component {
    
    // Assing a ref to the messages div
    messagesEnd = React.createRef()
    state = {
        loading: true, 
        messageList: [],
        currentMessage: '',
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount(){
        //setup your socket connection with the server
        socket = io(`${API_URL}`);

        let conversationId = this.props.match.params.chatId
        console.log(conversationId)

        axios.get(`${API_URL}/api/messages/${conversationId}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    loading: false, 
                    messageList: response.data
                }, () => {
                    this.scrollToBottom();
                })
            })
            .catch((err) => {
                console.log("Line 41", err)
            })
        // ensure that the user is connected to a specific chat via webSocket    
        console.log("Emit socket")
        socket.emit("join_chat", conversationId);

        //Handle incoming messages from webSocket
        socket.on("receive_message", (data) => {
            console.log('Got data', data)
            this.setState({
                messageList: [...this.state.messageList, data]
            }, () => {
                this.scrollToBottom();
            })
        });    
    }

    handleMessageInput = (e) => {
        this.setState({
            currentMessage: e.target.value
        })
    }

    onSendMessage = (event) => {
        event.preventDefault()
        console.log(event)
    }

    sendMessage = async () => {
        // Create the object structure
        let messageContent = {
            chatId: this.props.match.params.chatId,
            content: {
              sender: this.props.user,
              message: this.state.currentMessage,
            },
          };

          // emit it so that everyone connected to the same chat receives the message
        await socket.emit("send_message", messageContent);
        this.setState({
            messageList: [...this.state.messageList, messageContent.content],
            currentMessage: ''
        }, () => {
            this.scrollToBottom();
        })
    }


    render() {
        const { loading , messageList} = this.state
        console.log(messageList)
        const { user } = this.props

        if (loading) {
            return <p>Loading all messages . . .</p>
        }

        return (

            

            <div className="ChatPageWrapper">
                 <Navbar user={user}>
            
                <Container className='room'>
                    <Container  className='heading '>
                        <Typography  variant='h5'> Welcome to your chat with {messageList[0].sender.username} </Typography>
                    </Container>
                
                    <Container className="chatContainer">
                        <Box className="messages">
                            {
                                messageList.map((val) => {
                                    return (
                                        <Box key={val._id} className={`messageContainer ${val.sender.username == user.username ?"you" : "other"}`} 
                                        >
                                                {/* <TextField className="user">{val.sender.username}</TextField>
                                                <TextField className="msg">{val.message}</TextField> */}

                                                <span className="sender"> {val.sender.username}</span>
                                                <span className="msg">{val.message}</span> 

                                        </Box>
                                    );
                                })
                            }
                            <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </Box>
                        <div className="messageInputs">
                        <form onSubmit = {this.onSendMessage} noValidate>
                            <input value={this.state.currentMessage} type="text" placeholder="Message..."
                                onChange={this.handleMessageInput}
                            />
                            <Button type="submit" onClick={this.sendMessage}><SendIcon/></Button>
                        </form>
                        </div>
                    </Container>
                
                </Container>
                </Navbar> 
            </div>
        )
    }
}

export default ChatPage