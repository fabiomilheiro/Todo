import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { createConverter, Todo } from "../utils/types";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const todoConverter = createConverter<Todo>();

export const TodoList = () => {
  const firestore = useFirestore();
  const todosCollection = collection(firestore, "todos").withConverter(
    todoConverter
  );
  const todosQuery = query(todosCollection);
  const { data: todos } = useFirestoreCollectionData(todosQuery);

  if (todos === undefined) {
    console.log("todos undefined");
    return null;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h1" sx={{ fontSize: 20 }}>
        Todo list
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo) => {
          const todoRef = doc(todosCollection, todo.id);
          const labelId = `checkbox-list-label-${todo.id}`;
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role="document"
                onClick={async () => {
                  const newTodo: Todo = {
                    ...todo,
                    done: true,
                  };
                  console.log("New todo: ", newTodo);
                  console.log("Updating", newTodo);
                  await updateDoc(todoRef, newTodo);
                }}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText>
              {todo.id} {todo.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
