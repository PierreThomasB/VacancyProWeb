import {useEffect, useState} from "react";
import Pusher, {Channel} from 'pusher-js';
// @ts-ignore
import React  from "react";
import {observer} from "mobx-react";
import {Button, List, ListItem, ListItemText, Paper, TextField, Typography} from "@mui/material";
import {api} from "../../repositories/Api.ts";




function ChatSystem (){


    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);


    const pusher = new Pusher('74f1716b51dbbc6c19ca',{cluster: "eu"});

    useEffect(() => {
        let channel : Channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            let tempChat = chat;
            tempChat.push(data.message)
           setChat(tempChat);
            console.log(chat);

        });
    }, []);

    function handleSend() {
        setChat([...chat, message]);
         api.newMessage("my-channel",message);
        setMessage('');

    }




    return (

        <div>
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
                <List>
                    <ListItem key={"Ca gar"}>
                        <ListItemText primary={"Salut"} />
                    </ListItem>
                    <ListItem key={"Ca gar"}>
                        <ListItemText primary={"Salut"} />
                    </ListItem>
                    {chat.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={msg} />
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

        </div>



    );

}


export const ChatObserver = observer(ChatSystem);
