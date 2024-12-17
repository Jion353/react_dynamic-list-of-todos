import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ setVisible, todo }) => {
  const [isLoad, setIsLoad] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);

    if (todo) {
      getUser(todo.userId).then(setUser);
    }
  }, []);

  if (!todo) {
    return;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setVisible(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{user ? user.name : null}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
