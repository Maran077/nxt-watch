import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Tranding from './components/Tranding'
import Gaming from './components/Gaming'
import VideoPage from './components/VideoPage'
import SaveVideo from './components/SaveVideo'
import {SavedVideosProvider} from './Context/videoContext.js'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <SavedVideosProvider>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Tranding} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <ProtectedRoute exact path="/videos/:id" component={VideoPage} />
      <ProtectedRoute exact path="/saved-videos" component={SaveVideo} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </SavedVideosProvider>
)

export default App
