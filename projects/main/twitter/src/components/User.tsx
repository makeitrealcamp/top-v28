import React from 'react';
import { UserType } from '../api/users/types';

type UserProps = {
  children?: React.ReactNode;
} & Pick<UserType, 'name' | 'username' | 'profilePhoto'>;

export default function User({
  children,
  name = '',
  username = '',
  profilePhoto = '',
}: UserProps) {
  return (
    <div className="d-flex gap-2 justify-content-between rounded-pill p-2">
      <div className="d-flex align-items-center">
        <div className="p-2">
          <img
            src={profilePhoto || ''}
            className="rounded-circle object-fit-cover"
            width={40}
            height={40}
          />
        </div>
        <div className="d-flex flex-column">
          <strong>{name}</strong>
          <span>@{username}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
