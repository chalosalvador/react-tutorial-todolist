/**
 * Created by chalosalvador on 8/2/20
 */
import React, { useEffect } from 'react';
import '../styles/todo-list.css';

const TodoList = () => {

  const [ todos, setTodos ] = React.useState( [] );
  const [ completed, setCompleted ] = React.useState( [] );
  const [ darkMode, setDarkMode ] = React.useState( false );
  const [ windowWidth, setWindowWidth ] = React.useState( window.innerWidth );

  useEffect( () => {
    console.log( 'efecto', todos.length );
    if( todos.length > 0 ) {
      document.title = `${ todos.length } tareas pendientes`;
    } else {
      document.title = 'No tienes tareas pendientes';
    }
  }, [ todos ] );

  useEffect( () => {
    console.log( 'cambio de fondo', darkMode );
    if( darkMode ) {
      console.log( 'DARK' );
    } else {
      console.log( 'LIGHT' );
    }
  }, [ darkMode ] );

  useEffect( () => {
    fetch( 'https://jsonplaceholder.typicode.com/users/1' )
      .then( ( data ) => {
        return data.json();
      } )
      .then( ( json ) => {
        console.log( 'Datos de usuario', json );
      } );
  }, [] );

  const handleResize = () => {
    setWindowWidth( window.innerWidth );
  };

  useEffect( () => {
    console.log( 'Ejecución del efecto' );
    window.addEventListener( 'resize', handleResize );

    return () => {
      console.log( 'retorno del efecto ' );
      window.removeEventListener( 'resize', handleResize );
    };
  } );

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

  const handleDarkMode = () => {
    setDarkMode( !darkMode );
  };

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>
      <div>Ancho de la ventana: { windowWidth }</div>
      <button onClick={ handleDarkMode }>
        {
          darkMode
            ? 'Modo claro'
            : 'Modo oscuro'
        }
      </button>
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
