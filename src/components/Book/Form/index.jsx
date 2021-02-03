import './Form.css'
// import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from '../../Header'
import Footer from '../../Footer'
import ChapterTable from '../../Chapter/Table'

const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendBook = async (id, statusForm, form) => {
    let response = null;
    if (!id && statusForm)
        response = await fetch(`${urlBackend}myaccount/books/`, {
            method: "POST",
            body: form,
            headers: {
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    else if (id && statusForm) {
        response = await fetch(`${urlBackend}myaccount/books/${id}`, {
            method: "PUT",
            body: form,
            headers: {
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    } else if (id && !statusForm) {
        response = await fetch(`${urlBackend}myaccount/books/${id}`, {
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
    const [book, setBook] = useState({ id: query.id, statusForm: false, form: new FormData() });
    const [likes, setLikes] = useState({ qt: 0, color: 'black' });
    const [bookTitle, setBookTitle] = useState("");
    const [bookSummary, setBookSummary] = useState("");
    const [bookImage, setBookImage] = useState("");
    const [bookType, setBookType] = useState("");
    const [bookChapters, setBookChapters] = useState([]);
    const [bookStatus, setBookStatus] = useState("");
    useEffect(() => {
        async function getItems(id) {
            try {
                const data = await getBackendBook(id, null)
                if (!data.errors) {
                    setBookTitle(data.title)
                    setBookSummary(data.summary)
                    setBookType(data.type)
                    setBookStatus(data.status)
                    setBookChapters(data.chapters);
                    setLikes({ qt: data.likes, color: 'black' })
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
                    <h4 className="mb-3">Dados do livro</h4>
                    <form className="needs-validation" id="id_form_book" noValidate>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Titulo</label>
                            <input type="text" className="form-control" id="id_name" placeholder="" value={bookTitle} onChange={(e) => { setBookTitle(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um titulo válido.
                        </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Resumo</label>
                            <textarea className="form-control" id="id_summary" placeholder="" value={bookSummary} onChange={(e) => { setBookSummary(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um resumo válido.
                    </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickname">Imagem</label>
                            <input type="file" className="form-control-file" id="id_image" placeholder="Imagem" onChange={(e) => { setBookImage(e.target.value) }} />
                            <div className="invalid-feedback" style={{ width: "100%" }}>
                                Uma Imagem é obrigatória.
                    </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="id_type">Tipo:</label>
                                <select className="form-control" name="type" id="id_type" onChange={(e) => { setBookType(e.target.value) }} disabled>
                                    {/* <option value="0" selected="">Material</option> */}
                                    <option value="1">Publicado</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="id_status">Status:</label>
                                <select defaultValue={bookStatus} className="form-control" name="status" id="id_status" onChange={(e) => { setBookStatus(e.target.value) }}>
                                    <option value="0">Em produção</option>
                                    <option value="1">Concluido</option>
                                </select>
                            </div>
                        </div>
                        <h5 className="mb-4">Likes: {likes.qt} <span className="fa fa-thumbs-up" style={{ color: likes.color }}></span></h5>
                        <hr className="mb-4" />

                        <ChapterTable chapters={bookChapters} id={book.id}/>

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
