import { mutate } from 'swr';
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
  const { data: conversations } = useConversations();
  const { data: conversation } = useConversation({ id: selected });

  async function onMessage(content) {
    if (content && selected) {
      const newMessage = await createmessage({
        content,
        conversationId: selected,
      });

      mutate(
        `/conversations/${selected}`,
        (prevData) => {
          return {
            ...prevData,
            messages: [newMessage, ...prevData.messages],
          };
        },
        false,
      );

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

        mutate(
          `/conversations/${selected}`,
          (prevData) => {
            return {
              ...prevData,
              messages: [newMessage, ...prevData.messages],
            };
          },
          false,
        );
      }
    });

    socket.on('online', (user) => {
      mutate(
        '/conversations',
        (prevData) => {
          return prevData.map((conversation) => {
            if (conversation.userId === user.id) {
              return {
                ...conversation,
                online: true,
              };
            }
            return conversation;
          });
        },
        false,
      );
    });

    socket.on('offline', (user) => {
      mutate(
        '/conversations',
        (prevData) => {
          return prevData.map((conversation) => {
            if (conversation.userId === user.id) {
              return {
                ...conversation,
                ...conversation.user,
                online: false,
              };
            }
            return conversation;
          });
        },
        false,
      );
    });

    return () => {
      socket.off('message');
    };
  }, [selected, user.id]);

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
