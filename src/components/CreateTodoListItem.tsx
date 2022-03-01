import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { addDoc, CollectionReference, Timestamp } from "firebase/firestore";
import { Todo } from "../utils/types";
import { useSnackbar } from "notistack";

interface Props {
  todosCollection: CollectionReference<Todo>;
  onFinished: () => void;
}

export const CreateTodoListItem = ({ todosCollection, onFinished }: Props) => {
  const [title, setTitle] = useState("");
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
            checked={false}
            disabled
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New todo title"
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  <IconButton
                    onClick={async () => {
                      onFinished();
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      await addDoc(todosCollection, {
                        title,
                        done: false,
                        createTimestamp: Timestamp.now(),
                      })
                        .then((value) => {
                          enqueueSnackbar("Created todo successfully.", {
                            variant: "success",
                          });
                        })
                        .catch((error) => {
                          console.error(error);
                          enqueueSnackbar("Could not create todo.", {
                            variant: "error",
                          });
                        });

                      onFinished();
                    }}
                  >
                    <AddIcon />
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
