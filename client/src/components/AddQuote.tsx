import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Grid, makeStyles, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { addQuote } from '../API';

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

export const AddQuote: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const { handleSubmit, register } = useForm<IQuote>();

  const onSubmit = (data: any) => {
    addQuote(data as IQuote).then(res => {
      history.push('/quotes/' + (res.data.data as IQuote)._id)
    })
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
            <h1>Add new quote</h1>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
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
            <Button color="secondary" onClick={() => history.goBack()}>Cancel</Button>
            <Button color="primary" type="submit">Submit</Button>
          </CardActions>
        </form>
      </Card>
      </Grid>
    </div>
  );
};
