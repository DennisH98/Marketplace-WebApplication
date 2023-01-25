import React from 'react';
import "../../components/Message/message.css";

const Message = ({message, own}) => {
    return (
        <div className = {own ? "message own" : "message"}>

            <div className="messageTop">

                <img alt="Profile" className="messageImg" src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
            
                <p className="messageText">{message.messageText}</p>
            </div>

            <div className="messageBottom">
              
            </div>
            
        </div>
    );
}

export default Message;
