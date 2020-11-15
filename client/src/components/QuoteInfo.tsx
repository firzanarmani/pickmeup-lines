import { Button, Card, CardActions, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { deleteQuote, updateQuote } from '../API';
import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const QuoteInfo: React.FC = () => {
  const {id} = useParams<{ id: string }>()
  const { state, dispatch } = useContext(GlobalContext)
  const [editMode, setEdit] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)


  const history = useHistory()
  const classes = useStyles()
  
  const thisQuote = state.allQuotes.find(quote => quote._id as string === id) || {_id: "0", quote: "No such quote!"}

  const { handleSubmit, register } = useForm<IQuote>({
    defaultValues: thisQuote
  })

  const removeQuote = (id: string) => {
    deleteQuote(id).then(() => {
      setDeleteConfirmation(false)
      history.push("/quotes")
    })
  }

  const onSubmit = (data: any) => {
    updateQuote(data as IQuote).then(res => {
      setEdit(false)
      history.push('/quotes/' + (res.data.data as IQuote)._id)
    }).finally()
  };
  
  return (
    <div>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <h1>Here's the quote</h1>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                        disabled={!editMode}
                          fullWidth
                          inputRef={register}
                          label="Quote"
                          name="quote"
                          size="small"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        disabled={!editMode}
                          fullWidth
                          inputRef={register}
                          label="Details"
                          name="details"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                        disabled={!editMode}
                          fullWidth
                          inputRef={register}
                          label="Author"
                          name="author"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid container item xs={6} justify="center">
                        <FormControlLabel
                          control={
                            <Checkbox
                            disabled={!editMode}
                              inputRef={register}
                              name="verified"
                              size="small"
                            />
                          }
                          label="Verified" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </CardContent>
      
            <CardActions>
              <Button color="secondary" onClick={() => {editMode ? setEdit(false) : history.push('/quotes')}}>Cancel</Button>
              {thisQuote._id !== "0" && <Button color="secondary" onClick={() => setDeleteConfirmation(true)} style={{float: "right"}}>Delete</Button>}
              {editMode ? <Button color="primary" type="submit">Submit</Button> : <Button color="primary" disabled={thisQuote._id === "0"} onClick={()=>setEdit(true)}>Edit</Button>}
            </CardActions>
          </form>
        </Card>
      </Grid>

      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this quote?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => removeQuote(thisQuote._id || "0")} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
