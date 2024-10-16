import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './ViewMessages.css';

function ViewMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const db = getFirestore();
      const messagesCollection = collection(db, 'messages');
      const messageSnapshot = await getDocs(messagesCollection);
      const messagesList = messageSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <div className="messages-list">
        {messages.map(message => (
          <div className="message-card" key={message.id}>
            <div className="message-header">
              <span className="sender">{message.sender}</span>
              <span className="timestamp">{message.timestamp}</span>
            </div>
            <p className="message-content">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMessages;
