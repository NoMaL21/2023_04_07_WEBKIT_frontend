import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import "./App.css";
import { call, signout } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      page: 1, // 페이지 번호
      itemsPerPage: 5 // 페이지당 아이템 수
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  //delete 함수 추가
  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  deleteForCompleted = () => {
    const { items, page, itemsPerPage } = this.state;
    console.log("Before deleteForCompleted Items : ", items);
    
    const itemsToDelete = items.filter((item) => item.done);
    
    Promise.all(
      itemsToDelete.map((item) => call("/todo", "DELETE", item))
    ).then((responses) => {
      const newItems = items.filter((item) => !item.done);
      const lastPage = Math.ceil(newItems.length / itemsPerPage);
      this.setState({ items: newItems, page: lastPage });
    });
  };

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  // 페이지 이동 버튼 클릭 시 호출되는 함수
  handlePageChange = (page) => {
    this.setState({ page });
  };

  render() {
    const { items, page, itemsPerPage } = this.state;

    // 페이지 계산
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayItems = items.slice(startIndex, endIndex);

    // todo 아이템 생성
    const todoItems = displayItems.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {displayItems.map((item, idx) => (
              <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
            ))}
          </List>
        </Paper>
      );

    // 페이지 이동 버튼 생성
    const pageButtons = (
        <div className="Pagination">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
            <Button key={i} onClick={() => this.handlePageChange(i + 1)}>
              {i + 1}
            </Button>
          ))}
        </div>
      );

    // 네비게이션 바 코드
    const navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={signout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
    
    const noItemsFound = !todoItems && <h3>No items found.</h3>;

    return (
        <div>
          {navigationBar}
          <Container maxWidth="md">
            <AddTodo add={this.add} />
            {todoItems && (
              <div>
                <div className="TodoList">{todoItems}</div>
                {pageButtons}
              </div>
            )}
            {noItemsFound}
            <DeleteTodo deleteForCompleted={this.deleteForCompleted} />
          </Container>
        </div>
      );
    }
}

export default App;
