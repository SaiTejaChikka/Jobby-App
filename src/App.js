import './App.css'
import {Route, Switch} from 'react-router-dom'

import Jobs from './components/Jobs'
import JobItemsDetails from './components/JobItemsDetails'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
   <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemsDetails} />
    <Route component={NotFoundRoute}/>
    
   
    
  
  </Switch>
)

export default App
