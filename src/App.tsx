/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [isModalSee, setIsModalSee] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [isLoad]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodos={setTodos} />
            </div>

            <div className="block">
              {isLoad ? (
                <Loader />
              ) : (
                <TodoList
                  setModalVisible={setIsModalSee}
                  setSelectedTodo={setTodo}
                  todos={todos}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalSee && <TodoModal setVisible={setIsModalSee} todo={todo} />}
    </>
  );
};
