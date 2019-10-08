import React, {useState} from 'react';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleChange = name => e => {
        setError("");
        const value = e.target.value;
        switch (name) {
            case "name":
                setName(value);
                break;
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

    const clickSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password
        };
        signup(user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setError("");
                    setOpen(true);
                }
            });
    };

    const signup = user => {
        return fetch("http://localhost:8080/signup", {
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

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}/>
            </div>
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

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>

            <div className="alert alert-danger"
                 style={{display: error ? "" : "none"}}>
                {error}
            </div>
            <div className="alert alert-info"
                 style={{display: open ? "" : "none"}}>
                New account successfully created. Please sign in.
            </div>
            {signupForm()}
        </div>
    );
};

export default Signup;