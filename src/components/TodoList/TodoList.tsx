import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[] | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  setModalVisible,
  todos,
  setSelectedTodo,
  selectedTodo,
}) => {
  // console.log(todos);

  function mapTodos() {
    if (todos) {
      return todos.map(todo => (
        <tr
          data-cy="todo"
          className={
            selectedTodo !== null
              ? cn({ 'has-background-info-light': selectedTodo.id === todo.id })
              : undefined
          }
          key={todo.id}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                setModalVisible(true);
                setSelectedTodo(todo);
              }}
            >
              <span className="icon">
                <i
                  className={
                    selectedTodo && selectedTodo.id === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ));
    }

    return null;
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>{mapTodos()}</tbody>
    </table>
  );
};
