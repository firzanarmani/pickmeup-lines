import { Box, Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import CheckIcon from '@material-ui/icons/Check';
import React, { useContext, useEffect } from 'react';
import { getRandomQuote } from '../API';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    maxWidth: "90%",
    // minHeight: "20vh",
    // display: "flex",
    alignItems: "center",
    margin: "10px"
  },
  cardActions: {
    alignItems: "center"
  },
  checkIcon: {
    verticalAlign: 'middle !important', 
    paddingBottom: '3px'
  }
});

export const RandomQuote: React.FC = (props:any) => {
  const { state, dispatch } = useContext(GlobalContext)
  const classes = useStyles()
  const history = useHistory()

  const fetchRandomQuote = () => {
    dispatch({type: "SET_LOADING", payload: true})
      getRandomQuote().then(res => {
        dispatch({type: "GET_RANDOM_QUOTE", payload: res.data.data})
      }).catch(() => {
        dispatch({type: "GET_RANDOM_QUOTE", payload: {quote: "Not a quote but, something went wrong... No worries, just try again!", _id: "-1"}})
      }).finally(() => {
        dispatch({type: "SET_LOADING", payload: false})
      })
  }

  useEffect(() => {
    fetchRandomQuote()
  }, [])


  return (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      justify="center">
        <Card className={classes.card}>
          <CardContent>
            {state.isLoading ? <Skeleton variant="text" width={300} height={200} style={{justifyContent: "start"}} /> : 
              <div>
                <Typography variant="h3" align="center">{state.currentQuote.quote}</Typography>
                <Typography variant="h6" align="center">
                  <i>- {state.currentQuote.author}</i> {state.currentQuote.verified && <CheckIcon className={classes.checkIcon}/>}
                </Typography>
              </div>
            }
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button color="secondary" disabled={state.isLoading} onClick={() => fetchRandomQuote()}>
              {state.isLoading ? "Fetching" : "Get new random quote!"}
            </Button>
              {/* {state.currentQuote._id !== "-1" && <Button color="primary" onClick={() => history.push('/quotes/' + state.currentQuote._id)} >Edit this quote</Button>} */}
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography align="center">
              Wanna look around at the quotes we have or make some changes?<br/>Or maybe how about adding a new one?
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button color="secondary" onClick={() => history.push('/quotes')}>
              See all quotes
            </Button>
            <Button color="primary" onClick={() => history.push('/new')}>
              Add new quote
            </Button>
          </CardActions>
        </Card>
    </Grid>
  );
};
