import './Form.css'
import React, { useEffect, useState } from "react";
import Header from '../../Header'
import Footer from '../../Footer'
import { useParams } from "react-router-dom";
import moment from 'moment'

const urlBackend = 'http://localhost:3001/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdF9uYW1lIjoiSmFjeSIsImxhc3RfbmFtZSI6Ik9saXZlaXJhIiwiZW1haWwiOiJvbGFtdW5kbzEzMkBnbWFpbC5jb20iLCJ0ZWxlcGhvbmUiOm51bGwsImltYWdlIjpudWxsLCJhZGRyZXNzX2lkIjozNiwiYWN0aXZlIjoxLCJ2ZXJpZmllZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMS0yMlQwODowNDowOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wMS0yMlQwODoxODoxOS4wMDBaIn0sImlhdCI6MTYxMTMxMDk2MX0.c1Vd-B61txKdL9XQgHfVerWwCRfP99zOlRQPCk-iSaM'

const getBackendMeeting = async (id, statusForm, form) => {
    let response = null;
    if (!id && statusForm)
        response = await fetch(`${urlBackend}myaccount/meetings/`, {
            method: "POST",
            body: form,
            headers: {
                "Content-Type": 'multipart/form-data',
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    else if (id && statusForm) {
        response = await fetch(`${urlBackend}myaccount/meetings/${id}`, {
            method: "PUT",
            body: form,
            headers: {
                "Content-Type": 'multipart/form-data',
                authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
            }
        });
    } else if (id && !statusForm) {
        response = await fetch(`${urlBackend}myaccount/meetings/${id}`, {
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

const MeetingForm = (props) => {
    const query = useParams();
    const [meeting, setMeeting] = useState({ id: query.id, statusForm: false, form: new FormData() });
    const [meetingObjective, setMeetingObjective] = useState("");
    const [meetingSummary, setMeetingSummary] = useState("");
    const [meetingBookName, setMeetingBookName] = useState("");
    const [meetingDateTimeStart, setMeetingDateTimeStart] = useState("");
    const [meetingDateTimeFinish, setMeetingDateTimeFinish] = useState("");
    const [meetingLocation, setMeetingLocation] = useState("");
    const [inscriptions, setInscriptions] = useState({ qt: 0, color: 'black' });
    const setBody = async() => {
        let formData = meeting.form;
        appendFormData('objective', meetingObjective, formData);
        appendFormData('summary', meetingSummary, formData);
        appendFormData('book', meetingBookName, formData);
        appendFormData('datetime_start', meetingDateTimeStart, formData);
        appendFormData('datetime_finish', meetingDateTimeFinish, formData);
        meeting.statusForm = true;
        const data = await getBackendMeeting(meeting.id, meeting.statusForm, meeting.form)
        if (!data.errors) {
            alert(data.title)
        }
        else{
            alert(data.errors)
        }
    }

    useEffect(() => {
        async function getItems(id, statusForm, form) {
            try {
                const data = await getBackendMeeting(id, statusForm, form)
                if (!data.errors) {
                    setMeetingObjective(data.objective)
                    setMeetingSummary(data.summary)
                    setMeetingBookName(data.book)
                    setMeetingDateTimeStart(data.datetime_start)
                    setMeetingDateTimeFinish(data.datetime_finish)
                    setInscriptions({ qt: data.inscriptions, color: 'black' })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getItems(meeting.id, meeting.statusForm, meeting.form);
    }, [meeting])

    let location;
    if (meeting.id)
        location = true;
    else
        location = false;
    return (
        <div>
            <Header />
            <div className="container py-4">
                <div>
                    <h4 className="mb-3">Dados do Encontro</h4>
                    <form className="needs-validation" id="id_form_book" >
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Objetivo</label>
                            <input type="text" className="form-control" id="id_name" placeholder="Objetivo" value={meetingObjective} onChange={(e) => { setMeetingObjective(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um objetivo válido.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Link de acesso</label>
                            <input type="link" className="form-control" id="id_link" placeholder="Link" value={meetingLocation} onChange={(e) => { setMeetingLocation(e.target.value) }}  disabled={location}/>
                            <div className="invalid-feedback">
                                É obrigatório inserir um link válido.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="primeiroNome">Resumo</label>
                            <textarea className="form-control" id="id_summary" placeholder="" value={meetingSummary} onChange={(e) => { setMeetingSummary(e.target.value) }} required />
                            <div className="invalid-feedback">
                                É obrigatório inserir um resumo válido.
                    </div>
                            <div className="mb-3">
                                <label htmlFor="primeiroNome">Nome do livro</label>
                                <input type="text" className="form-control" id="id_name" placeholder="" value={meetingBookName} onChange={(e) => { setMeetingBookName(e.target.value) }} required />
                                <div className="invalid-feedback">
                                    É obrigatório inserir um objetivo válido.
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="primeiroNome">Data e hora de inicio</label>
                                <input type="datetime-local" className="form-control" id="id_datetime_start" placeholder="" value={moment(meetingDateTimeStart).format('YYYY-MM-DDTH:mm')} onChange={(e) => { setMeetingDateTimeStart(e.target.value) }} required />
                                <div className="invalid-feedback">
                                    É obrigatório inserir um data de inicio válida.
                            </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="primeiroNome">Data e hora prevista para finalizar</label>
                                <input type="datetime-local" className="form-control" id="id_datetime_finish" placeholder="" value={moment(meetingDateTimeFinish).format('YYYY-MM-DDTH:mm')} onChange={(e) => { setMeetingDateTimeFinish(e.target.value) }} required />
                                <div className="invalid-feedback">
                                    É obrigatório inserir um data válida.
                                </div>
                            </div>
                        </div>
                        <h5 className="mb-4">Inscritos: {inscriptions.qt} <i className="fa fa-user" style={{ color: inscriptions.color }}></i></h5>
                        <hr className="mb-4" />
                        <button className="btn btnC btn-primary btn-lg btn-block" type="button" onClick={() => setBody()}>Adicionar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default MeetingForm;
