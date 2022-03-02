import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
} from "@mui/material";
import { deleteDoc, DocumentReference, updateDoc } from "firebase/firestore";
import { Todo } from "../utils/types";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoListItemEditForm } from "./TodoListItemEditForm";
import { useSnackbar } from "notistack";
import { useUserContext } from "./context/UserContext";

interface Props {
  todo: Todo;
  todoRef: DocumentReference<Todo>;
}

export const TodoListItem = ({ todo, todoRef }: Props) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUserContext();
  const labelId = `checkbox-list-label-${todo.id}`;
  return editFormOpen ? (
    <TodoListItemEditForm
      todo={todo}
      todoRef={todoRef}
      onFinish={() => setEditFormOpen(false)}
    />
  ) : (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              edge="end"
              aria-label="edit"
              disabled={!user}
              onClick={() => setEditFormOpen(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              disabled={!user}
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
        disablePadding
      >
        <ListItemButton role="document" dense disableRipple={true}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.done}
              onChange={async () => {
                await updateDoc(todoRef, {
                  done: !todo.done,
                });
              }}
              disabled={!user}
              tabIndex={-1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={todo.title} />
        </ListItemButton>
      </ListItem>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Delete todo</DialogTitle>
        <DialogContentText sx={{ paddingX: 3, pb: 2 }}>
          Are you sure you want to delete this todo?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              setDeleteDialogOpen(false);
              await deleteDoc(todoRef)
                .then(() =>
                  enqueueSnackbar("Deleted todo successfully.", {
                    variant: "success",
                  })
                )
                .catch((error) =>
                  enqueueSnackbar("Could not delete todo.", {
                    variant: "error",
                  })
                );
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
