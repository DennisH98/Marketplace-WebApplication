import React from 'react';
import "../../components/Conversations/conversation.css";

const Conversation = ({conversation}) => {
    

    return (
        <div className="conversation">
            <img alt="Profile" className="conversationImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
            <span className="conversationName">{conversation}</span>
        </div>
    );
}

export default Conversation;
