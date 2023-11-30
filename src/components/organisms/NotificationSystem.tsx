import {observer} from "mobx-react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// @ts-ignore
import React from "react";
import {Badge} from "@mui/material";


function NotificationSystem (){




    return (
       <div>
           <Badge badgeContent={4} color="secondary">
            <NotificationsOutlinedIcon />
           </Badge>


       </div>
    )

}

export const NotificationSystemComp = observer(NotificationSystem);