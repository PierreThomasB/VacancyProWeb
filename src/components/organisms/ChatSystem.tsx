import {useEffect, useState} from "react";
import Pusher, {Channel} from 'pusher-js';
// @ts-ignore
import React  from "react";
import {observer} from "mobx-react";
import {Button, List, ListItem, ListItemText, Paper, Popover, TextField, Typography} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import Message from "../../models/Message.ts";
import {MessageComponent} from "../molecules/MessageComponent.tsx";
import {chatStore} from "../../stores/ChatStore.ts";
import User from "../../models/User.ts";
import {Messages} from "../../models/Messages.ts";
const config = require('../../config.json') ;




function ChatSystem ({channel_name}){


    const [message, setMessage] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const [chat, setChat] = useState<Messages>(new Messages(Array.from([])));



    const initPusher = () : Pusher => {
        const pusher = new Pusher(config.PusherApiKey,{cluster: "eu" });
        let channel : Channel = pusher.subscribe(channel_name);
        channel.bind('my-event', function(data) {
            let message = new Message(channel_name, data.Message, data.Date, data.UserName)
            setChat(prevChat => new Messages([...prevChat.messages, message]));
        });
        return pusher;
    }


    const getMessages = async () => {
        let res = await chatStore.handleGetAllMessage(channel_name);
        setChat(res);
    }




    useEffect(() => {
        getMessages();
        const pusher = initPusher();
        return () => {
            pusher.unsubscribe(channel_name);
        };

    }, []);

    const handleSend = async () =>  {
        chatStore.handleSendMessage(channel_name, message );
        setMessage('');

    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    if(chat === null){
        return (    <div>
                        <p>Loading Chat </p>
                    </div>
        );
    }


    /**
     *   {chat.messages.map((msg, index) => {
     *                         return (
     *                                 <ListItem key={index} >
     *                                     <MessageComponent message ={msg as any}/>
     *                         </ListItem>
     *                 )
     *                  })}
     */

    return (

        <div>
            <Button aria-describedby={"id"} variant="contained" onClick={handleClick}>
                <MessageIcon/>
            </Button>
        <Popover open={open} onClose={handleClose} >
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                <List>
                    {chat.messages.map((msg, index) => {
                        return (
                            <ListItem key={index} >
                                <MessageComponent  message ={msg as any}/>
                            </ListItem>
                        )
                    })}
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
