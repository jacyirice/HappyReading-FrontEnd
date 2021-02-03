import './Card.css'
import { Card } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
const onClickPath = (path) => {
    if (path.startsWith('/home')) {
        return false
    }
    else if (path.startsWith('/myaccount')) {
        return true
    }
}

const BookCardBody = (props) => {
    return (<div className="row align-items-center">
        <img className="topico-img" src={props.image} alt={`Imagem do livro ${props.title}`} />
        <Card className="card-block topico-desc text-center">
            <Card.Body>
                <Card.Title as="h4">{props.title}</Card.Title>
                <Card.Text>{props.summary}</Card.Text>
            </Card.Body>
        </Card></div>)
}

const BookCard = (props) => {
    const path = useLocation().pathname
    const myaccountRedirect = onClickPath(path)
    if (myaccountRedirect)
        return (
            <Link className="col-sm-4 pt-4" to={path + '/' + props.id}>
                <BookCardBody {...props} />
            </Link>
        );
    else
        return (
            <div className="col-sm-4 pt-4" onClick={() => props.cb({ show: true, id: props.id })}>
                <BookCardBody {...props} />
            </div>
        );

}
export default BookCard;
