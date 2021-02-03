import './List.css'
import MeetingCard from '../Card'
import MeetingModal from '../Modal'
import React, { useEffect, useState } from "react";
import Header from '../../Header'
import Footer from '../../Footer'
import { useLocation } from "react-router-dom";
import { urlBackend, token } from '../../../global'

// locationAlt = {
//     "/myaccount": "myaccount/meeting/...",
//     "/home": "/home/..."
const UrlGetMeetings = (location) => {
    const url = urlBackend;
    let path = location.pathname
    if (path.startsWith('/home')) {
        return url + 'home/meetings?limit=30'
    }
    else if (path.startsWith('/myaccount')) {
        if (path.startsWith('/myaccount/meetings/inscriptions')) {
            return url + 'myaccount/meetings/inscriptions?limit=30'
        }
        return url + 'myaccount/meetings?limit=30'
    }
}

const getBackendMeetings = async (location) => {
    let response = await fetch(UrlGetMeetings(location), {
        method: "GET",
        headers: {
            authorization: `bearer ${token}`//`${sessionStorage.getItem('token')}`
        }
    });
    return await response.json();
}

const getCardMeeting = (meetings, cb) => {
    return meetings.map((meeting, index) => {
        return <MeetingCard datetime_start={meeting.datetime_start} objective={meeting.objective} id={meeting.id} key={index} cb={cb} />
    })
}

const MeetingList = (props) => {
    const [modalMeeting, setModalMeeting] = useState({ show: false, id: 0 });
    const [meetings, setMeetings] = useState([]);
    const location = useLocation();
    useEffect(() => {
        async function getItems(location) {
            try {
                const data = await getBackendMeetings(location)
                setMeetings(data.items);
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro ao buscar os items");
            }
        }
        getItems(location);
    }, [location]);

    return (
        <div>
            < Header />
            <section className="py-8 py-md-11">
                <div className="container">
                    <div className="row topico">
                        <p className="col-lg-11">Encontros</p>
                    </div>
                    <div className="row ml-1" id="div-meetings">
                        {getCardMeeting(meetings, setModalMeeting)}
                    </div>
                </div>
            </section>
            <MeetingModal
                id={modalMeeting.id}
                show={modalMeeting.show}
                onHide={() => setModalMeeting({ show: false, id: 0 })}
            />
            <Footer />
        </div>
    );
}

export default MeetingList;
