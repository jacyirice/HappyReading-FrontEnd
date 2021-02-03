import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./containers/Login";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Home from './components/Home'
import ChapterDetails from './components/Chapter/Details'
import MeetingList from './components/Meeting/List' 
import BookList from './components/Book/List' 

ReactDOM.render(
    <BrowserRouter>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/home/books/:id_book/chapters/:id" children={<ChapterDetails />}/>
            <Route path="/home/books/">
                <BookList />
            </Route>
            <Route path="/home/meetings/">
                <MeetingList />
            </Route>
        </Switch>


    </ BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();