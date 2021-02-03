import './Card.css';
import { Card } from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/pt-br';
import { useLocation, Link } from "react-router-dom";

const onClickPath = (path) => {
    if (path.startsWith('/home')) {
        return false
    }
    else if (path === '/myaccount/meetings/inscriptions') {
        return false
    }
    else if (path.startsWith('/myaccount')) { return true }
}

const MeetingCardBody = (props) => {
    return (<div className="row align-items-center card-encontro">
        <Card className="card-block text-center">
            <Card.Body>
                <Card.Title as="h5">{props.objective}</Card.Title>
                <Card.Text>{moment(props.datetime_start).locale('pt-br').format('Do MMMM, YYYY')}</Card.Text>
            </Card.Body>
        </Card></div>)
}

const MeetingCard = (props) => {
    const path = useLocation().pathname
    const myaccountRedirect = onClickPath(path)
    if (myaccountRedirect)
        return (
            <Link className="col-sm-3 pt-4 modal-meeting" to={path + '/' + props.id}>
                <MeetingCardBody {...props} />
            </Link>
        );
    else
        return (
            <div className="col-sm-3 pt-4 modal-meeting" onClick={() => props.cb({ show: true, id: props.id })}>
                <MeetingCardBody {...props} />
            </div>
        );
}
export default MeetingCard;
