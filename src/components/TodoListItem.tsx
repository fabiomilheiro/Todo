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

interface Props {
  todo: Todo;
  todoRef: DocumentReference<Todo>;
}

export const TodoListItem = ({ todo, todoRef }: Props) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
              onClick={() => setEditFormOpen(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
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
        <ListItemButton
          role="document"
          onClick={async () => {
            await updateDoc(todoRef, {
              done: !todo.done,
            });
          }}
          dense
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.done}
              tabIndex={-1}
              disableRipple
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
