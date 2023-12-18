import {observer} from "mobx-react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// @ts-ignore
import React, {useEffect, useState} from "react";
import {Badge, Box, Popper} from "@mui/material";
import {ObservedSnackBar} from "../molecules/SnackBar.tsx";
import {NotificationComponent} from "../molecules/NotificationComponent.tsx";
import Notification from "../../models/Notification.ts";
import {Notifications} from "../../models/Notifications.ts";
import {canGetNotifications} from "../../stores/NotificationStore.ts";


function NotificationSystem (){
    const [notifications , setNotifications] = useState( new Notifications( []));
    const [open,setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [loading , setLoading] = useState<boolean>(false);




    const getNotifications = async ()  => {
        let res = await  canGetNotifications.handleGetNotifications();
        setNotifications(res);
    }

    useEffect(() => {
        getNotifications().then(
            () => {
                setLoading(true);
            }
        )



    }, []);

    const setOpenPopper = (event) => {
        setAnchorEl(event.currentTarget);
        open ? setOpen(false) : setOpen(true);
    }




if(!loading){
    return(
    <div>loading</div>
    )
}

    return (
       <div>
           <Badge badgeContent={notifications.notificationsCount} color="secondary"  >
            <NotificationsOutlinedIcon onClick={setOpenPopper}  />
           </Badge>
           <Box style={{minWidth:"25%"}}>
               <Popper open={open} placement={"bottom" } anchorEl={anchorEl} >
                       {notifications.notifications.map((notification : Notification) => {
                           return (
                               <NotificationComponent nom={notification.contenu} id={notification.id} />
                           )
                       })}
               </Popper>
           </Box>
       </div>
    )

}

export const NotificationSystemComp = observer(NotificationSystem);