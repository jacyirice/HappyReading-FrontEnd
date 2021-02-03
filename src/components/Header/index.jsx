
import './Header.css'
import Logo from '../../asserts/logo.svg'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = (props) => {

    return (
        <nav className="navbar navbar-expand-md bg-white">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={Logo} className="navbar-brand-img" alt="..." />
                </a>
                <button className="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#collapsingNavbar2">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbar2">
                    <form className="navbar-nav mx-auto col-lg-6">
                        <div className="input-group search">
                            <input type="text" className="form-control search" placeholder="Busque titulo, autores..." aria-label="Busque titulo, autores..." aria-describedby="basic-addon1" />
                            <div className="input-group-append">
                                <i className="input-group-text search"></i>
                            </div>
                        </div>
                    </form>
                    <div className="col-lg-2">
                        <DropdownButton
                            menuAlign="right"
                            title="Jacyiricê"
                            //  {sessionStorage.getItem('user').first_name}
                            className="row align-items-center"
                        >
                            <Dropdown.Item eventKey="1"><Link to={'/home'}>Home</Link></Dropdown.Item>
                            <Dropdown.Item eventKey="2"><Link to={'/myaccount/books'}>Meus livros</Link></Dropdown.Item>
                            <Dropdown.Item eventKey="3"><Link to={'/myaccount/meetings'}>Meus encontros</Link></Dropdown.Item>
                            <Dropdown.Item eventKey="3"><Link to={'/myaccount/meetings/inscriptions'}>Inscrições</Link></Dropdown.Item>
                            <Dropdown.Item eventKey="3"><Link to={'/myaccount/meetings'}>Curtidas</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Sair</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        </nav >
    );
}
export default Header;
