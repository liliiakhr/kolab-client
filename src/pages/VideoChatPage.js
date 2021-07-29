import React, {useEffect, useRef, useState} from 'react'
import {Button, IconButton, TextField} from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Peer from "simple-peer"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import io from "socket.io-client"
import API_URL from '../config'
import './VideoChat.css'

const socket = io.connect(`${API_URL}`)

function VideoChatPage() {
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
	const connectionRef= useRef()

    useEffect(() => {
        let notify = async () => {
            try{
            //Lets the browser prompt the user to allow audio and video access
            let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
            setStream(stream)
            //sets hosts ref video to the stream being broadcast
            myVideo.current.srcObject = stream
            }
            catch (error){

            }
        }
        notify()


       socket.on('me', (id) => {
           setMe(id)
       })
       

       socket.on('callUser', (data) => {
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
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})

        //Sets the reference of the attendee's video to the streem after the peer connection
        peer.on('stream' , (stream) => {
            userVideo.current.srcObject = stream
        })
        
        //once the call is accepted the signal connection is then handled here
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        
        //sets the connection reference to the peer the host has connected to
        connectionRef.current = peer
    } 

    // WARNING: LOTS OF REPEATED CODE for more on peers 

    //sets the user who answers as a new Peer to the call
    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
           initiator: false,
           trickle: false,
           stream: stream
        })

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, to: caller})
        })

        peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
    }
    
    //This will end the call and destroy the connection reference 
    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()

    }


    return (
        <>
		<h1 style={{ textAlign: "center", color: '#fff' }}>Kolab Face-lab</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "500px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<TextField
					id="filled-basic"
					label="Name"
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
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>
    )
}

export default VideoChatPage
