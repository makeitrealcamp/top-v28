import React, { useContext } from 'react';
import UserContext from '../containers/UserContext';
import PropTypes from 'prop-types';

export default function User({ children, name, username, photo }) {
  const { user } = useContext(UserContext);

  return (
    user && (
      <div className="d-flex gap-2 justify-content-between rounded-pill p-2">
        <div className="d-flex">
          <div className="p-2">
            <img src={photo || user.photo} className="rounded-circle" />
          </div>
          <div className="d-flex flex-column">
            <strong>{name || user.name}</strong>
            <span>@{username || user.username}</span>
          </div>
        </div>
        {children}
      </div>
    )
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

User.defaultProps = {
  name: 'Gustavo Morales',
  username: 'gmoralesc',
  photo: 'https://placehold.co/40x40',
};
