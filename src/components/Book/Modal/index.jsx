import './Modal.css'
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'
const bookJson = { title: undefined, status: undefined, summary: undefined, chapters: [] }

const urlGetBook = (location) => {
    const url = urlBackend;
    let path = location.pathname
    if (path.startsWith('/home')) {
        return url + 'home/'
    }
    else if (path.startsWith('/myaccount')) {
        return url + 'myaccount/'
    }
}

const getBackendBook = async (id, location) => {
    if (!id)
        return bookJson;
    let response = await fetch(urlGetBook(location) + `books/${id}`, {
        method: "GET",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const postLike = async (id) => {
    let response = await fetch(urlBackend + `home/books/${id}/like`, {
        method: "POST",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    const aux = await response.json();
    return aux;
}

const getPChapters = (id, chapters) => {
    return chapters.map((chapter, index) => {
        return <Link to={`/home/books/${id}/chapters/${chapter.id}`}>{index + 1} - {chapter.title}</Link>
    })
}


const BookModal = (props) => {
    const [book, setBook] = useState(bookJson);
    const [likes, setLikes] = useState({ qt: 0, color: 'black' });
    const location = useLocation();
    useEffect(() => {
        async function getItems(id, location) {
            try {
                const data = await getBackendBook(id, location)
                if (!data.errors) {
                    setBook(data);
                    setLikes({ qt: data.likes, color: 'black' })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getItems(props.id, location);
    }, [props, location]);

    const setLike = async (id) => {
        try {
            const data = await postLike(id)
            if (!data.errors) {
                setLikes({ qt: likes.qt + 1, color: 'blue' })
            } else {
                alert(data.errors)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            tabIndex="-1"
        >
            <Modal.Body className="mx-2">
                <div className="popup">
                    <div>
                        <h4>{book.title}</h4>
                        <h6>Estado do livro: {book.status === 0 ? 'Em produção' : 'Concluido'} </h6>
                    </div>
                    <div className="py-4">
                        <p className="popup-desc">{book.summary}</p>
                        <p className="likes" onClick={() => { setLike(props.id) }}>{likes.qt} <span className="fa fa-thumbs-up" style={{ color: likes.color }}></span></p>
                    </div>
                    <div>
                        <p>Capítulos</p>
                        {getPChapters(book.id, book.chapters)}
                    </div>
                </div>
            </Modal.Body>
            {/* <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <img className="img-modal" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="" />
            </div> */}
        </Modal >
    );
}
export default BookModal;
