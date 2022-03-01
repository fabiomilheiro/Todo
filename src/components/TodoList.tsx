import { useState } from "react";
import {
  Box,
  Container,
  Fab,
  List,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { createConverter, Todo } from "../utils/types";
import AddIcon from "@mui/icons-material/Add";
import { TodoListItem } from "./TodoListItem";
import { CreateTodoListItem } from "./CreateTodoListItem";

const todoConverter = createConverter<Todo>();

export const TodoList = () => {
  const [creatingNewTodo, setCreatingNewTodo] = useState<boolean>();
  const theme = useTheme<Theme>();
  const firestore = useFirestore();
  const todosCollection = collection(firestore, "todos").withConverter(
    todoConverter
  );
  const todosQuery = query(todosCollection, orderBy("createTimestamp"));
  const { data: todos } = useFirestoreCollectionData(todosQuery, {
    idField: "id",
  });

  if (todos === undefined) {
    return <Box>Loading...</Box>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" sx={{ textAlign: "center", m: 3 }}>
        Todo list with firebase 🔥
      </Typography>
      <List sx={{ width: "100%" }}>
        {todos.map((todo) => {
          const todoRef = doc(todosCollection, todo.id);
          return <TodoListItem key={todo.id} todo={todo} todoRef={todoRef} />;
        })}
        {creatingNewTodo && (
          <CreateTodoListItem
            todosCollection={todosCollection}
            onFinished={() => setCreatingNewTodo(false)}
          />
        )}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: theme.spacing(1),
          right: theme.spacing(1),
        }}
        onClick={() => setCreatingNewTodo(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};
