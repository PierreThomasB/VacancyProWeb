import {useEffect, useState} from "react";
import Pusher, {Channel} from 'pusher-js';
// @ts-ignore
import React  from "react";
import {observer} from "mobx-react";
import {Button, List, ListItem, ListItemText, Paper, Popover, TextField, Typography} from "@mui/material";
import {api} from "../../repositories/Api.ts";
import MessageIcon from '@mui/icons-material/Message';
import Message from "../../models/Message.ts";
import {MessageComponent} from "../molecules/MessageComponent.tsx";




function ChatSystem ({channel_name} ){


    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);




    const pusher = new Pusher('74f1716b51dbbc6c19ca',{cluster: "eu"});



    const getMessages = async () => {
        let result = await api.AllMessage("channel_1");
        let tempMessage = [];
        result.forEach(message => {
           tempMessage.push(message.message);
        });
        setChat(tempMessage);
    }

    useEffect(() => {
        getMessages();
        let channel : Channel = pusher.subscribe(channel_name);
        channel.bind('my-event', function(data) {
            //setChat([...chat,message]);
            //console.log(chat);

        });
    }, []);

    function handleSend() {
        setChat([...chat, message]);
        let messageObj = new Message(channel_name,message);
         api.newMessage(messageObj);
        setMessage('');

    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




    return (

        <div>
            <Button aria-describedby={"id"} variant="contained" onClick={handleClick}>
                <MessageIcon/>
            </Button>
        <Popover open={open} onClose={handleClose} >

            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                <List>
                    {chat.map((msg, index) => (
                        <ListItem key={index} >
                            <MessageComponent/>
                        </ListItem>
                    ))}
                </List>
                <TextField
                    label="Message"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSend}>
                    Send
                </Button>
            </Paper>

        </Popover>
        </div>

    );

}


export const ChatObserver = observer(ChatSystem);
