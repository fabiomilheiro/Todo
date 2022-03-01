import { useState } from "react";
import {
  Box,
  Checkbox,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { Todo } from "../utils/types";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

interface Props {
  todo: Todo;
  todoRef: DocumentReference<Todo>;
  onFinish: () => void;
}

export const TodoListItemEditForm = ({ todo, todoRef, onFinish }: Props) => {
  const [title, setTitle] = useState(todo.title);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <ListItem disablePadding>
      <Box
        display="flex"
        sx={{
          marginLeft: 2,
          width: "100%",
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.done}
            disabled
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    onClick={() => {
                      onFinish();
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      await updateDoc(todoRef, {
                        title,
                      })
                        .then(() =>
                          enqueueSnackbar("Edited todo successfully.", {
                            variant: "success",
                          })
                        )
                        .catch((error) => {
                          console.error(error);
                          enqueueSnackbar("Could not edit todo.", {
                            variant: "error",
                          });
                        });

                      onFinish();
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </>
              ),
            }}
          />
        </ListItemText>
      </Box>
    </ListItem>
  );
};
