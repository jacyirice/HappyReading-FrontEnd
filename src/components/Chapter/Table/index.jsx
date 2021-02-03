import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const deleteChapter = async (id, id_book) => {
    const response = await fetch(`${urlBackend}myaccount/books/${id_book}/chapters/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    const json = await response.json();
    if (!json.errors)
        alert(json.errors)
    else
        alert(json.message)
}

const ChapterTableRow = (props) => {
    return (
        <tr>
            <td>
                <p>{props.title}</p>
            </td>
            <td><Button variant="danger" onClick={()=>deleteChapter(props.id,props.id_book)}>Apagar</Button>{' '}</td>
        </tr>
    );
}
const getRowTable = (chapters, id_book) => {
    return chapters.map((chapter, index) => {
        return <ChapterTableRow title={chapter.title} id={chapter.id} id_book={id_book} key={index} />
    })
}

const ChapterTable = (props) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <th colSpan="2">Capitulos</th>
            </thead>
            <tbody>
                <tr>
                    <th>Titulo</th>
                    <th>Apagar?</th>
                </tr>
                {getRowTable(props.chapters, props.id)}
            </tbody>
            <tfoot>
                <td colSpan="2"> <Link to={`/myaccount/books/${props.id}/chapters/new`}><i class="fa fa-plus fa-lg" style={{ color: '#447e9b' }} aria-hidden="true"></i> Adicionar outro capitulo</Link></td>
            </tfoot>
        </Table>);
}
export default ChapterTable;