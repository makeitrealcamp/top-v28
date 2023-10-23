import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Chat from '../components/Chat';
import List from '../components/List';
import FormMessage from '../components/FormMessage';
import UserContext from '../containers/UserContext';
import useConversations from '../domain/useConversations';
import useConversation from '../domain/useConversation';
import { createmessage } from '../api/messages';
import socket from '../socket';

export default function Home() {
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(state?.selected || 0);
  const {
    data: conversations,
    actions: { setOnlineStatus },
  } = useConversations();
  const {
    data: conversation,
    actions: { addMessage },
  } = useConversation({ id: selected });

  async function onMessage(content) {
    if (content && selected) {
      const newMessage = await createmessage({
        content,
        conversationId: selected,
      });

      addMessage({ newMessage });

      socket.emit('message', {
        newMessage,
        conversationId: selected,
        recepientId:
          conversation?.userAId === user?.id
            ? conversation?.userBId
            : conversation?.userAId,
      });
    }
  }

  useEffect(() => {
    socket.on('message', (payload) => {
      const { conversationId, recepientId } = payload;
      if (recepientId === user.id && conversationId === selected) {
        const { newMessage } = payload;

        addMessage({ newMessage });
      }
    });

    socket.on('online', (user) => {
      setOnlineStatus({ user, state: true });
    });

    socket.on('offline', (user) => {
      setOnlineStatus({ user, state: false });
    });

    return () => {
      socket.off('message');
      socket.off('online');
      socket.off('offline');
    };
  }, [addMessage, selected, setOnlineStatus, user]);

  return (
    <Row className="mt-4 d-flex flex-grow-1">
      <Col md={4}>
        <List
          list={conversations}
          selected={selected}
          onSelect={(id) => setSelected(id)}
        />
      </Col>
      <Col md={8} className="d-flex flex-column">
        <Chat messages={conversation?.messages} userId={user?.id} />
        <FormMessage onSend={onMessage} />
      </Col>
    </Row>
  );
}
