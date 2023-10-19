import { useContext, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import List from '../components/List';
import UserContext from '../containers/UserContext';
import useUsers from '../domain/useUsers';
import useConversations from '../domain/useConversations';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { data: users } = useUsers();
  const {
    data: conversations,
    actions: { create: createConversation },
  } = useConversations();

  const list = useMemo(() => {
    if (users && user) {
      return users.filter((u) => {
        const hasConversation = conversations.find((c) => c.id === u.id);
        return u.id !== user.id && !hasConversation;
      });
    }
    return [];
  }, [user, users, conversations]);

  async function onSelect(id) {
    const conversation = await createConversation({ recipientId: id });
    navigate('/home', {
      state: { selected: conversation.id },
    });
  }

  return (
    <Container className="mt-4">
      <List list={list} onSelect={onSelect} />
    </Container>
  );
}
