import './Footer.css'
import Logo from '../../asserts/logo.svg'
const Footer = () => {
    return (
        <footer className="pt-4 py-8">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src={Logo} className="img-fluid mb-2" alt="" />
                        <p>
                            HappyReading é uma plataforma de encontros, troca e publicação de livros.
                    </p>

                        <ul className=" list-inline mb-6 mb-md-0">
                            <li className="list-inline-item mr-3">
                                {/* <a href="#"> */}
                                <i className="fa fa-instagram" ></i>
                                {/* </a> */}
                            </li>
                            <li className="list-inline-item mr-3">
                                {/* <a href="#"> */}
                                <i className="fa fa-facebook-official"></i>
                                {/* </a> */}
                            </li>
                            <li className="list-inline-item mr-3">
                                {/* <a href="#"> */}
                                <i className="fa fa-twitter-square" ></i>
                                {/* </a> */}
                            </li>
                        </ul>
                        <p className="co">©2020HappyReading</p>

                    </div>
                </div>
            </div>
        </footer>

    )

}

export default Footer