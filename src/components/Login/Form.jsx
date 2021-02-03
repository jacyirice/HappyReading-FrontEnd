import './Form.css'

import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
	// 	<body>
	// <div className="container h-100">
	// 	<div className="d-flex justify-content-center h-100">
	// 		<div className="user_card">
	// 			<div className="d-flex justify-content-center">
	// 				<div className="brand_logo_container">
	// 					<img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo"/>
	// 				</div>
	// 			</div>
	// 			<div className="d-flex justify-content-center form_container">
	// 				<form>
	// 					<div className="input-group mb-3">
	// 						<div className="input-group-append">
	// 							<span className="input-group-text"><i className="fas fa-user"></i></span>
	// 						</div>
	// 						<input type="text" name="" className="form-control input_user" value="" placeholder="username"/>
	// 					</div>
	// 					<div className="input-group mb-2">
	// 						<div className="input-group-append">
	// 							<span className="input-group-text"><i className="fas fa-key"></i></span>
	// 						</div>
	// 						<input type="password" name="" className="form-control input_pass" value="" placeholder="password"/>
	// 					</div>
	// 					<div className="form-group">
	// 						<div className="custom-control custom-checkbox">
	// 							<input type="checkbox" className="custom-control-input" id="customControlInline"/>
	// 							<label className="custom-control-label" for="customControlInline">Remember me</label>
	// 						</div>
	// 					</div>
	// 						<div className="d-flex justify-content-center mt-3 login_container">
	// 			 	<button type="button" name="button" className="btn login_btn">Login</button>
	// 			   </div>
	// 				</form>
	// 			</div>
		
	// 			<div className="mt-4">
	// 				<div className="d-flex justify-content-center links">
	// 					Don't have an account? <p className="ml-2">Sign Up</p>
	// 				</div>
	// 				<div className="d-flex justify-content-center links">
	// 					<p>Forgot your password?</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
			
    //     <div className="second-column">
    //       <h2 className="title title-second-2">Login</h2>
    //       <form className="form">
    //         <label className="label-input" for="">
    //           <i className="far fa-envelope icon-modify"></i>
    //         </label>
	// 		<input type="email" placeholder="Email"/>

    //         <label className="label-input" for="">
    //           <i className="fas fa-lock icon-modify"></i>
    //         </label>
	// 		<input type="password" placeholder="Password"/>
    //         <button className="btn btn-second-2">SIGN IN</button>
    //       </form>
    //     </div>

	// 	</body>

	// )
// }

export default LoginForm