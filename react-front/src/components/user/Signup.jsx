import React, {useState} from 'react';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = name => event => {
        const value = event.target.value;
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
                <button className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;