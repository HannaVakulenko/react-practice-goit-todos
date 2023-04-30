import React, { Component } from 'react'; //, { Component }
import shortid from 'shortid';
import Container from './Container/Container';
import initialTodos from './TodoList/todos.json';
import TodoEditor from './TodoEditor/TodoEditor';
import Filter from './Filter/Filter';
import TodoList from './TodoList/TodoList';
import { Header } from './Header/Header';

class App extends Component {
  state = {
    todos: [], // or todos, it shortheadproperty // initialTodos
    filter: '',
  };

  // LS: render > didMount > getItem > setState > update > render > didUpdate > setItem

  componentDidMount() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos !== null) {
      this.setState({
        todos: JSON.parse(savedTodos),
      });
    } else {
      this.setState({
        todos: initialTodos,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

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
        <Header />
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

//import Counter from './Counter/Counter';
//import Dropdown from './Dropdown/Dropdown';
// import ColorPicker from './ColorPicker/ColorPicker';
// import Form from './Form/Form';

// Add to <Container> for watching

//   <h1>Стан компонента</h1>

//   <Counter />         //

//   <Dropdown />         //

//   <ColorPicker options={colorPickerOptions} />         //

//   onSubmit={this.formSubmitHandler} - це пропс         //

//   <Form onSubmit={this.formSubmitHandler} />         //
