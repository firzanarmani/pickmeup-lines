import { AppBar, Box, Button, createMuiTheme, createStyles, IconButton, makeStyles, Theme, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { RandomQuote } from './components/RandomQuote';
import { QuoteList } from './components/QuoteList';
import { GlobalProvider } from './context/GlobalState';
import { QuoteInfo } from './components/QuoteInfo';
import { AddQuote } from './components/AddQuote';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={ darkTheme }>
      <GlobalProvider>
        <CssBaseline />
        <Box height="100vh" width="100vw">
          <Router>
            <Route path="/" exact render={() => <RandomQuote />} />
            <Route path="/quotes" exact component={ QuoteList } />
            <Route path="/new" exact component={ AddQuote } />
            <Route path="/quotes/:id" component={ QuoteInfo } />
          </Router>
        </Box>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
