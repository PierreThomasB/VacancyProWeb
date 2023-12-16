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




function ChatSystem ({channel_name} ){


    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState([] as Message[]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);







    const getMessages = async () => {
        let res = await chatStore.handleGetAllMessage(channel_name);
        console.log(res);
        setChat(res);
    }

    useEffect(() => {
        getMessages();

        const pusher = new Pusher('74f1716b51dbbc6c19ca',{cluster: "eu" });

        let channel : Channel = pusher.subscribe(channel_name);


        channel.bind('my-event', function(data) {
            console.log(data);
            let user = new User(data.User.Id , data.User.UserName , data.User.Email,null,false,null);
            setChat(val => {
                return [...val, new Message(channel_name, data.Message, data.Date, user)];
            });
        });

        return () => {
            pusher.unsubscribe(channel_name);
        };

    }, []);

    const  handleSend = async () =>  {
        await chatStore.handleSendMessage(channel_name,message);
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



// <MessageComponent message ={msg}/>
    return (

        <div>
            <Button aria-describedby={"id"} variant="contained" onClick={handleClick}>
                <MessageIcon/>
            </Button>
        <Popover open={open} onClose={handleClose} >
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                <List>
                    {chat.map((msg, index) => {
                        return (
                                <ListItem key={index} >
                                    <MessageComponent message ={msg as any}/>
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
