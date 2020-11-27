import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Background from './components/Background';
import AllRecipees from './components/AllRecipees';
import BackToTop from './components/AppBar';
import DetailedRecipee from './components/DetailedRecipee';
import PostRecipee from './components/PostRecipee';
import UICard from './components/UICard';
import Grid from "@material-ui/core/Grid";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Switch>
            <Route path="/postRecipee">
              <PostRecipee />
            </Route>
            {/* <Route path="/detailedRecipee/:id"
              render={(props) => <DetailedRecipee {...props} />}
            >
            </Route> */}
            <Route path="/detailedRecipee/:id"
              render={(props) => <UICard {...props} />}
            >
            </Route> 
            <Route path="/">
              <Background />
              <AllRecipees />
              <BackToTop />
            </Route>
          </Switch>
      </div>
    </Router>
    </ApolloProvider>
    
  );
}

export default App;
