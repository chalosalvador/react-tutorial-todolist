/**
 * Created by chalosalvador on 8/2/20
 */
import React from 'react';

const TodoList = () => {

  const [ todos, setTodos ] = React.useState( [] );
  const [ completed, setCompleted ] = React.useState( [] );


  const handleAddTask = () => {
    const task = document.querySelector( '#task' ).value;
    setTodos( prevState => [ ...prevState, task ] );
    document.querySelector( '#task' ).value = '';
  };

  const handleDeleteTask = ( index ) => {
    setTodos( ( prevState ) => {
      return prevState.filter( ( task, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {
    setCompleted( ( prevState ) => [
      ...prevState,
      todos[ index ]
    ] );

    handleDeleteTask( index );
  };


  return (
    <div>
      <div>
        <label htmlFor='task'>Tarea</label>
        <input type='text' id='task' />

        <button onClick={ handleAddTask }>Agregar tarea</button>
      </div>
      <h1>Lista de tareas pendientes ({ todos.length } en total)</h1>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Eliminar</th>
          <th>Completar</th>
        </tr>
        </thead>
        <tbody>
        {
          todos.map( ( task, index ) => (
              <tr key={ index }>
                <td>{ task }</td>
                <td>
                  <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                </td>
                <td>
                  <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
                </td>
              </tr>
            )
          )
        }
        </tbody>
      </table>

      <h1>Lista de tareas completadas ({ completed.length } en total)</h1>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
        </tr>
        </thead>
        <tbody>
        {
          completed.map( ( task, index ) => (
              <tr key={ index }>
                <td>{ task }</td>
              </tr>
            )
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
