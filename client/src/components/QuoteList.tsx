import { Card, CardContent, Container, Divider, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllQuotes } from '../API';
import { GlobalContext } from '../context/GlobalState';
import CheckIcon from '@material-ui/icons/Check';

interface QuoteListItemProps {
    quote: IQuote
}

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
    width: "90%",
    maxHeight: "80vh",
    // minHeight: "20vh",
    // display: "flex",
    alignItems: "center",
    margin: "10px",
    overflow: "auto"
  },
  list: {
    width: '100%',
    maxHeight: "100%",
    overflow: "auto"
    // maxWidth: '36ch',
  },
  inline: {
    display: 'inline',
  },
  checkIcon: {
    verticalAlign: 'middle !important', 
    paddingBottom: '3px'
  }
});

const QuoteListItem: React.FC<QuoteListItemProps> = ({ quote }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div>
      <ListItem button onClick={() => history.push('/quotes/' + quote._id)} alignItems="flex-start">
        <ListItemText
          primary={quote.quote}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                // className={classes.inline}
                color="textPrimary"
              >
                {quote.author} {quote.verified && <CheckIcon className={classes.checkIcon}/>}
              </Typography>
              {quote.details}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  )
}

export const QuoteList: React.FC = () => {
  const {state, dispatch} = useContext(GlobalContext)
  const classes = useStyles()

  useEffect(() => {
    dispatch({type: "SET_LOADING", payload: true})
    getAllQuotes().then(res => {
        dispatch({type: "GET_ALL_QUOTES", payload: res.data.data})
    }).finally(() => {
      dispatch({type: "SET_LOADING", payload: false})
    })
  }, [])


  return (
    <div>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center">
          <Card className={classes.card}>
              <CardContent>
                <Typography component="h5" variant="h5">
                  All Quotes
                </Typography>
                {state.isLoading ? <Skeleton variant="text" width="100%" height={200} style={{justifyContent: "start"}} /> : 
                  <List className={classes.list}>
                    {state.allQuotes.map(quote => <QuoteListItem quote={quote} key={quote._id}/>)}
                  </List>
                }
              </CardContent>
          </Card>
      </Grid>
    </div>
  );
};
