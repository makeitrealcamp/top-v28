import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

import Create from '../components/Create';
import Tweet from '../components/Tweet';
import UserContext from '../containers/UserContext';

const Name = styled('strong')(({ theme }) => ({
  color: theme.colors.primary,
}));

export default function Home() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">{t('home.title')}</h1>
      <p>
        {t('home.header.tweets', {
          count: 2,
        })}
      </p>
      <p>
        <Trans
          i18nKey="home.message"
          values={{
            user: 'Javier',
          }}
          components={{
            bold: <Name />,
          }}
        />
      </p>
      {user && <Create />}
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </>
  );
}
