import './Home.css'
import BookCard from '../Book/Card'
import BookModal from '../Book/Modal'
import MeetingCard from '../Meeting/Card'
import MeetingModal from '../Meeting/Modal'
import Header from '../Header'
import Footer from '../Footer'
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";


const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendHome = async () => {
    let response = await fetch(urlBackend + 'home', {
        method: "GET",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}
const getCardBooks = (books, cb) => {
    return books.map((book, index) => {
        return <BookCard title={book.title} image={book.image} summary={book.summary} id={book.id} key={index} cb={cb}/>
    })
}
const getCardMeeting = (meetings,cb) => {
    return meetings.map((meeting, index) => {
        return <MeetingCard datetime_start={meeting.datetime_start} objective={meeting.objective} id={meeting.id} key={index} cb={cb}/>
    })
}

const Home = (props) => {
    const [modalBook, setModalBook] = useState({show:false,id:0});
    const [modalMeeting, setModalMeeting] = useState({show:false,id:0});
    const [home, setHome] = useState({'books':[],'meetings':[]});
    useEffect(() => {
        async function getItems() {
            try {
                const data = await getBackendHome()
                setHome(data);
            } catch (error) {
                alert("Ocorreu um erro ao buscar os items");
            }
        }
        getItems();
    }, []);

    return (
        <div>
            < Header/>
            <section className="py-8 py-md-11">
                <div className="container">
                    <div className="row topico">
                        <p className="col-lg-11">Encontros disponiveis</p>
                        <Link to={'/home/meetings'}>Mais -&gt;</Link>
                        {/* <p className="col-lg-1 offset-lg-1">Mais -&gt;</p> */}

                    </div>
                    <div className="row ml-1" id="div-meetings">
                        {getCardMeeting(home.meetings, setModalMeeting)}
                    </div>

                    <div className="row pt-4 topico">
                        <p className="col-lg-11">Livros com novos capitulos</p>
                        <Link to={'/home/books'}>Mais -&gt;</Link>
                        {/* <a className="col-lg-1">Mais -></a> */}

                    </div>

                    <div className="row ml-1" id="div-books">
                        {getCardBooks(home.books, setModalBook)}
                    </div>
                </div>
            </section>
            <BookModal
                id={modalBook.id}
                show={modalBook.show}
                onHide={() => setModalBook({show:false,id:0})}
            />
            <MeetingModal
                id={modalMeeting.id}
                show={modalMeeting.show}
                onHide={() => setModalMeeting({show:false,id:0})}
            />
            <Footer/>
        </div>
    );
}
export default Home;
