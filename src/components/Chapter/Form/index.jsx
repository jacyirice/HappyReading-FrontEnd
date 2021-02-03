import './Form.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../../Header'
import Footer from '../../Footer'

const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendBook = async (id, id_book, statusForm, form) => {
    let response = null;
    if (!id && statusForm)
        response = await fetch(`${urlBackend}myaccount/books/${id_book}/chapters`, {
            method: "POST",
            body: form,
            headers: {
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    else if (id && statusForm) {
        response = await fetch(`${urlBackend}myaccount/books/${id_book}/chapters${id}`, {
            method: "PUT",
            body: form,
            headers: {
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    } else if (id && !statusForm) {
        response = await fetch(`${urlBackend}myaccount/books/${id_book}/chapters${id}`, {
            method: "GET",
            headers: {
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    }
    return await response.json();

}

const appendFormData = (key, value, cb) => {
    if (value)
        cb.set(key, value);
}

const BookForm = (props) => {
    const query = useParams();
    const [book, setBook] = useState({ id: query.id, id_book: query.id_book, statusForm: false, form: new FormData() });
    const [bookTitle, setBookTitle] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterContent, setChapterContent] = useState("");
    useEffect(() => {
        async function getItems(id) {
            try {
                const data = await getBackendBook(id, null)
                if (!data.errors) {
                    setBookTitle(data.book.title)
                    setChapterTitle(data.title)
                    setChapterContent(data.content)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getItems(query.id);
    }, [query]);

    return (
        <div>
            <Header />
            <div className="container py-4">
                <div>
                    <h4 className="mb-3">Capitulo do livro {bookTitle}</h4>
                    <form className="needs-validation" id="id_form_book" noValidate>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Titulo</label>
                            <input type="text" className="form-control" id="id_name" placeholder="" value={chapterTitle} onChange={(e) => { setChapterTitle(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um titulo válido.
                        </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Resumo</label>
                            <textarea className="form-control" id="id_summary" placeholder="" value={chapterContent} onChange={(e) => { setChapterContent(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um resumo válido.
                    </div>
                        </div>
                        <hr className="mb-4" />

                        <button className="btn btnC btn-primary btn-lg btn-block" type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default BookForm;
