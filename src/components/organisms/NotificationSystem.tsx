import {observer} from "mobx-react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// @ts-ignore
import React, {useEffect, useState} from "react";
import {Badge, Box, Popper} from "@mui/material";
import {ObservedSnackBar} from "../molecules/SnackBar.tsx";
import {notificationStore} from "../../stores/NotificationStore.ts";
import {NotificationComponent} from "../molecules/NotificationComponent.tsx";
import Notification from "../../models/Notification.ts";


function NotificationSystem (){
    const [notifications , setNotifications] = useState<[]|null>([]);
    const [open,setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);




    const getNotifications = async ()  => {
        let res =  await   notificationStore.handleGetNotifications();
        console.log(res);
        // @ts-ignore
        setNotifications(res);
    }

    useEffect(() => {
        getNotifications()



    }, []);

    const setOpenPopper = (event) => {
        setAnchorEl(event.currentTarget);
        open ? setOpen(false) : setOpen(true);
    }






    return (
       <div>
           <Badge badgeContent={notifications.length} color="secondary"  >
            <NotificationsOutlinedIcon onClick={setOpenPopper}  />
           </Badge>
           <Box style={{minWidth:"25%"}}>
               <Popper open={open} placement={"bottom" } anchorEl={anchorEl} >
                       {notifications.map((notification : Notification) => {
                           return (
                               <NotificationComponent nom={notification.contenu} id={notification.id} />
                           )
                       })}
               </Popper>
           </Box>
           <ObservedSnackBar open={notificationStore.open} message={notificationStore.errorMsg} severity={notificationStore.severity}/>

       </div>
    )

}

export const NotificationSystemComp = observer(NotificationSystem);