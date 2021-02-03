import './List.css'
import BookCard from '../Card'
import BookModal from '../Modal'
import React, { useEffect, useState } from "react";
import Header from '../../Header'
import Footer from '../../Footer'
import { useLocation } from "react-router-dom";

const urlBackend = 'http://localhost:3001/';
const UrlGetBooks = (location) =>{
    const url = urlBackend;
    let path = location.pathname
    if (path.startsWith('/home')){
        return url+'home/books?limit=30'
    }
    else if (path.startsWith('/myaccount')){
        return url+'myaccount/books?limit=30'
    }
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendBooks = async (location) => {
    let response = await fetch(UrlGetBooks(location), {
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

const BookList = (props) => {
    const [modalBook, setModalBook] = useState({show:false,id:0});
    const [books, setBooks] = useState([]);
    const location = useLocation();
    useEffect(() => {
        async function getItems(location) {
            try {
                const data = await getBackendBooks(location)
                setBooks(data.items);
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro ao buscar os items");
            }
        }
        getItems(location);
    }, [location]);

    return (
        <div>
            <Header/>
            <section className="py-8 py-md-11">
                <div className="container">
                    <div className="row pt-4 topico">
                        <p className="col-lg-11">Livros</p>
                    </div>

                    <div className="row ml-1" id="div-books">
                        {getCardBooks(books, setModalBook)}
                    </div>
                </div>
            </section>
            <BookModal
                id={modalBook.id}
                show={modalBook.show}
                onHide={() => setModalBook({show:false,id:0})}
            />
            <Footer/>
        </div>
    );
}
export default BookList;
