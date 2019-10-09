import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = name => e => {
        setError("");
        const value = e.target.value;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next();
        }
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const user = {
            email,
            password
        };
        signin(user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                } else {
                    authenticate(data, () => {
                        setRedirectToReferrer(true);
                    });
                }
            });
    };

    const signin = user => {
        return fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}/>
            </div>
            <button onClick={clickSubmit}
                    className="btn btn-raised btn-primary">Submit
            </button>
        </form>
    );
    if (redirectToReferrer) {
        return <Redirect to="/"/>
    }
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signin</h2>
            <div className="alert alert-danger"
                 style={{display: error ? "" : "none"}}>
                {error}
            </div>

            {loading && <div className="jumbotron text-center">
                <h2>Loading...</h2>
            </div>}
            
            {signinForm()}
        </div>
    );
};

export default Signin;