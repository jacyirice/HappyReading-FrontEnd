import './Modal.css'
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendBook = async (id) => {
    let response = await fetch(urlBackend + `home/meetings/${id}`, {
        method: "GET",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const postPresence = async (id) => {
    let response = await fetch(urlBackend + `home/meetings/${id}/markPresence`, {
        method: "POST",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const deletePresence = async (id) => {
    let response = await fetch(urlBackend + `myaccount/meetings/${id}/markPresence`, {
        method: "DELETE",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const format_date = (date) => {
    return new Date(date).toLocaleString()
};

const checkUrl = (path, url) => {
    if (path.startsWith(url))
        return true;
    return false;
}

const buttonText = (path) => {
    if (checkUrl(path, '/home'))
        return "Marcar presença"
    else if (checkUrl(path, '/myaccount/meetings/inscriptions'))
        return "Desmarcar presença"
}

const meetingJson = { id: undefined, book: undefined, objective: undefined, summary: undefined, datetime_start: undefined, datetime_finish: undefined, inscriptions: 0, user: { first_name: undefined, last_name: undefined } }

const BookModal = (props) => {
    const path = useLocation().pathname;
    const [meeting, setMeeting] = useState(meetingJson);
    const [inscriptions, setInscriptions] = useState({ qt: 0, color: 'black' });

    useEffect(() => {
        async function getItems(id) {
            if (!id)
                return setMeeting(meetingJson);
            try {
                const data = await getBackendBook(id)
                if (!data.errors) {
                    setMeeting(data);
                    setInscriptions({ qt: data.inscriptions, color: 'black' })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getItems(props.id);
    }, [props]);

    const setPresence = async (id) => {
        try {
            let data, qtAux;
            if (checkUrl(path, '/home')) {
                data = await postPresence(id)
                qtAux = inscriptions.qt + 1
            }
            else if (checkUrl(path, '/myaccount/meetings/inscriptions')) {
                data = await deletePresence(id)
                qtAux = inscriptions.qt - 1
            }
            if (!data.errors) {
                setInscriptions({ qt: qtAux, color: 'blue' })
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

                        <h4 className="program-meeting">Horário: {format_date(meeting.datetime_start)} até {format_date(meeting.datetime_finish)}</h4>
                        <h5 className="type-meeting">Tipo de Encontro: Digital</h5>
                        <h5 className="plataforma-meeting">Objetivo: {meeting.objective}</h5>
                        <h5 className="plataforma-meeting">Livro: {meeting.book}</h5>
                        <h5 className="plataforma-meeting">Anfitrião: {meeting.user.first_name} {meeting.user.last_name} </h5>
                        <h5 className="plataforma-meeting">Inscritos: {inscriptions.qt} <i className="fa fa-user" style={{ color: inscriptions.color }}></i></h5>
                    </div>
                    <div className="py-4 popup-resumo">{meeting.summary}</div>

                    <button onClick={() => { setPresence(props.id) }} className="botao-inscricao btn btn-primary btn-custom-start">
                        <i>{buttonText(path)}</i>
                    </button>
                </div>
            </Modal.Body>
        </Modal >
    );
}
export default BookModal;
