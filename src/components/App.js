import React, { Component } from 'react'; //, { Component }
import shortid from 'shortid';
import Container from './Container/Container';
//import Counter from './Counter/Counter';
//import Dropdown from './Dropdown/Dropdown';
// import ColorPicker from './ColorPicker/ColorPicker';
import initialTodos from './TodoList/todos.json';
import TodoEditor from './TodoEditor/TodoEditor';
import Filter from './Filter/Filter';
import TodoList from './TodoList/TodoList';

// import Form from './Form/Form';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: initialTodos, // or todos, it shortheadproperty
    filter: '',
  };

  addTodo = text => {
    console.log(text);

    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      //деструктуризація prevState
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));

    // this.setState(({ todos }) => ({
    //   todos: todos.map(todo =>
    //     todo.id === todoId
    //       ? {
    //           ...todo,
    //           completed: !todo.copmleted,
    //         }
    //       : todo
    //   ),
    // }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculatedCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodosCount = todos.length;
    const completedTodosCount = this.calculatedCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <div>
          <p>Total todos: {totalTodosCount}</p>
          <p>Total done: {completedTodosCount}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;

// Add to <Container> for watching

//   <h1>Стан компонента</h1>

//   <Counter />         //

//   <Dropdown />         //

//   <ColorPicker options={colorPickerOptions} />         //

//   onSubmit={this.formSubmitHandler} - це пропс         //

//   <Form onSubmit={this.formSubmitHandler} />         //
