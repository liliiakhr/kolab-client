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
import moment from 'moment';
import Animation from '../components/Animation'
import loading from '../json/loading.json';


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
                // console.log(response.data)
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
    }

    sendMessage = async () => {
        // Create the object structure
        if (this.state.currentMessage.length === 0){
            return;
        }
        
        let messageContent = {
            chatId: this.props.match.params.chatId,
            content: {
                sender: this.props.user,
                message: this.state.currentMessage,
                
            },
            };
        await socket.emit("send_message", messageContent);
        this.setState({
            messageList: [...this.state.messageList, messageContent.content],
            currentMessage: ''
        }, () => {
            this.scrollToBottom();
        })
        // console.log(this.messageList)
    }


    render() {
        const { loading , messageList} = this.state
        const { user } = this.props

        // messageList.forEach(element => {
        //     console.log(element);
        //     console.log(moment(element.createdAt));
        // });

        if (loading) {
            return  <Animation width={300} height={300} animation={loading} />

        }

        return (

            

            <div className="ChatPageWrapper">
                 <Navbar user={user}>
            
                <Container className='room'>
                    <Container  className='heading '>
                         {messageList.length == 0 ? <Typography className='heading-text' variant='h5'> Send your first message  
                         </Typography> : <Typography className='heading-text' variant='h5'> Chat 
                         </Typography>}
                    </Container>
                
                    <Container className="chatContainer">
                        <Box className="messages">
                            {
                                messageList.map((val,i) => {
                                    console.log(val)
                                    return (
                                        <Box key={i} className={`messageContainer ${val.sender.username == user.username ?"you" : "other"}`} 
                                        >
                                                <span className="sender"> {val.sender.username}</span>
                                                <div className="msg">
                                                    <span>{val.message}</span>

                                                <p className={"msg-time"}>{ moment(val.createdAt).format('HH:mm')}</p>
                                                </div>
                                                

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