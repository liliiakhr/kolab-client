import React, {useEffect, useRef, useState} from 'react'
import {Button, IconButton, TextField, Typography} from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Peer from "simple-peer"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import io from "socket.io-client"
import API_URL from '../config'
import './VideoChat.css'
import Animation from '../components/Animation'
import videochat from '../json/videochat.json'

const socket = io.connect(`${API_URL}`)

function VideoChatPage({username}) {
    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")

    //useRef is going to be used as a reference to display the video of the host 
    // and the attendee respectfully and the connectionRef is to allow for disconnecting
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

    useEffect(() => {
		socket.current = io.connect("/face-lab");
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
		  setStream(stream);
		  if (myVideo.current) {
			myVideo.current.srcObject = stream;
		  }
		})

       socket.current.on('me', (id) => {
           setMe(id)
       })
       

       socket.current.on('callUser', (data) => {
           setReceivingCall(true)
           setCaller(data.from)
           setName(data.name)
           setCallerSignal(data.signal)
       })
    }, [])
    
    //This allows the connection between to systems(peers)
    const callUser = (id) => {
        const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
        })
        
        //This allows for users to be able to call another user to the call
        peer.on("signal", (data) => {
			socket.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})

        //Sets the reference of the attendee's video to the streem after the peer connection
		peer.on("stream", stream => {
			if (userVideo.current) {
			  userVideo.current.srcObject = stream;
			}
		  });
        
        //once the call is accepted the signal connection is then handled here
        socket.current.on('callAccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
    } 

    // WARNING: LOTS OF REPEATED CODE for more on peers 

    //sets the user who answers as a new Peer to the call
    const acceptCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
           initiator: false,
           trickle: false,
           stream: stream
        })

        peer.on('signal', (data) => {
            socket.current.emit('acceptCall', {signal: data, to: caller})
        })

        peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})
		peer.signal(callerSignal)
    }
    
    //This will end the call and destroy the connection reference 
    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }


    return (
        <div className="video-chat">
		<Typography variant='h1' color="primary" style={{marginTop: '2%'}}>😂Kolab Face-lab🤪</Typography>
		<div className="container">
			<div className="video-container">
				<div className="video" style={{borderRadius: '20px', border: '5px dashed orange' }}>
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px", borderRadius: '20px'}} />}
				</div>
				<div className="video" style={{borderRadius: '20px', border: '5px dashed orange' }}>
					{
						!callAccepted && (
						<> 
						<Animation height={300} width={500} animation={videochat} style={{borderRadius: '20px'}}/>
						<Typography variant="h4" color="secondary" style={{marginLeft: '10px'}}>Looking good {username}</Typography >
						<Typography variant="h4" color="secondary" style={{marginLeft: '10px'}}>Somebody should be in soon . . .</Typography>
						</>
						)
					}
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "500px", borderRadius: '20px'}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<TextField
					id="filled-basic"
					label="Your Name*"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<Typography variant='h3' color="primary">{name} is calling...</Typography>
						<Button variant="contained" color="primary" onClick={acceptCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</div>
    )
}

export default VideoChatPage
