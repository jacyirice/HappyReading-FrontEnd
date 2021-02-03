import './Chapter.css'
import Header from '../../Header'
import Footer from '../../Footer'
import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModal from '../../Book/Modal';

const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'
const chapterJson = { id: 0, title: '', content: '', book: { title: '', id: 0 } }
const getBackendChapter = async (id, id_book) => {
    if (!id || !id_book)
        return chapterJson;
    let response = await fetch(urlBackend + `home/books/${id_book}/chapters/${id}`, {
        method: "GET",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const ChapterDetails = (props) => {
    const [modalBook, setModalBook] = useState(false);
    const [chapter, setChapter] = useState(chapterJson);
    const query = useParams();
    
    useEffect(() => {
        async function getItems(id, id_book) {
            try {
                const data = await getBackendChapter(id, id_book)
                setChapter(data);
            } catch (error) {
                alert(error.errors);
            }
        }
        getItems(query.id, query.id_book);
    }, [query]);
    return (
        <>
            <Header />
            <section className="py-8 py-md-11">
                <div className="container">

                    <Table className="table-chapter" striped bordered hover variant="dark">
                        <tr onClick={() => setModalBook(true)}>
                            <td>Livro: {chapter.book.title}</td>
                        </tr>
                        <tr>
                            <td>Capítulo: {chapter.title}</td>
                        </tr>
                        <tr>
                            <td>{chapter.content}</td>
                        </tr>
                    </Table></div></section>
            <BookModal
                id={query.id_book}
                show={modalBook}
                onHide={() => setModalBook(false)}
            />

            <Footer />
        </>
    );
}
export default ChapterDetails;
