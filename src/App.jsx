import './App.css';
import './asserts/geral.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
// import LoadingPage from './components/LoadingPage'
import ChapterDetails from './components/Chapter/Details'
import MeetingList from './components/Meeting/List'
import MeetingForm from './components/Meeting/Form'
import BookList from './components/Book/List'
import BookForm from './components/Book/Form'
import ChapterForm from './components/Chapter/Form'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/"><LoadingPage /></Route> */}
          <Route exact path="/home"><Home /></Route>

          <Route exact path="/home/books/"><BookList /></Route>
          <Route path="/home/books/:id_book/chapters/:id" children={<ChapterDetails />} />

          <Route exact path="/home/meetings/"><MeetingList /></Route>

          <Route exact path="/myaccount/books/"><BookList /></Route>
          <Route exact path="/myaccount/books/new"><BookForm /></Route>
          <Route path="/myaccount/books/:id_book/chapters/new"><ChapterForm /></Route>
          <Route path="/myaccount/books/:id_book/chapters/:id" children={<ChapterDetails />} />
          <Route path="/myaccount/books/:id"><BookForm /></Route>

          <Route exact path="/myaccount/meetings/"><MeetingList /></Route>
          <Route exact path="/myaccount/meetings/inscriptions"><MeetingList /></Route>
          <Route exact path="/myaccount/meetings/new"><MeetingForm /></Route>
          <Route path="/myaccount/meetings/:id"><MeetingForm /></Route>

        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
