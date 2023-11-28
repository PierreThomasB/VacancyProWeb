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
import {chatStore} from "../../stores/ChatStore.ts";




function ChatSystem ({channel_name} ){


    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);




    const pusher = new Pusher('74f1716b51dbbc6c19ca',{cluster: "eu"});



    const getMessages = async () => {
        let res = await chatStore.handleGetAllMessage(channel_name);
        res.forEach(message => {
            chat.push(message)
        })
        console.log(chat);
    }

    useEffect(() => {
        getMessages();
        let channel : Channel = pusher.subscribe(channel_name);
        channel.bind('my-event', function(data) {
            console.log(data);
            setChat([...chat ,new Message(channel_name,data.Message,data.Date)]);
        });
    }, []);

    const  handleSend = async () =>  {
        setChat([...chat, new Message(channel_name,message,new Date())]);
        await chatStore.handleSendMessage(channel_name,message);
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
                            <MessageComponent message={msg.message}  date={msg.date}/>
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
