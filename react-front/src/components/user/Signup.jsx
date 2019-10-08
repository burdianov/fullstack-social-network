import React, {useState} from 'react';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = name => e => {
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
        fetch("http://localhost:8080/signup", {
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

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>
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
        </div>
    );
};

export default Signup;