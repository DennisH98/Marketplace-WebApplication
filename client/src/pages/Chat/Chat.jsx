import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Toolbar from "@mui/material/Toolbar";
import ConversationProduct from "../../components/Conversations/ConversationProduct";
import "../../pages/Chat/chat.css";
import Message from "../../components/Message/Message";
import Conversation from "../../components/Conversations/Conversation";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const theme = createTheme();

export default function Messenger() {
  const token = localStorage.getItem("jwtToken");
  const userData = jwt_decode(token);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);

  // Get Conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + userData.id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  // Get Messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // Submit Messages
  const handleSubmit = async (e) => {
    //e.preventDefault();
    const message = {
      sender: userData.id,
      messageText: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // Get Product related to conversation
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/product/" + currentChat?.members[1]
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [currentChat]);

  // Get sellers informaiton
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/" + currentChat?.members[2]
        );
      setUser(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);  



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
              <div className="chatMenuTitle">Select a Conversation:</div>
                {conversations.map((c) => (
                  <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c.members[3]}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages.map((m) => (
                        <Message message={m} own={m.sender === userData.id} />
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="Message ..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>{" "}
                  </>
                ) : (
                  <span>Open a conversation!</span>
                )}
              </div>
            </div>

            <div className="productBox">
            {currentChat ? (
                  <>
                    <div>
                    <div className="productUser">
                      <span className="productUserHeader">Seller: </span>
                      <span>{user.username}</span>
                    </div>  
                      <ConversationProduct productID={products}/>
                    </div>
                  </>
                ) : (
                  <span>....</span>
                )}
            </div>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
