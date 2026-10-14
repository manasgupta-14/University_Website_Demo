import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../data/auth.js";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password.length < 6) {
            setError("Password minimum 6 characters.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Password And Confirm password doesn't match");
            return;
        }

        setLoading(true);
        try {
            await registerUser({ name: form.name, email: form.email, password: form.password });
            navigate("/login", {
                state: { message: "Registration successful" },
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="grid min-h-screen place-items-center auth-page px-4 py-10">
            <div className="search-panel w-full max-w-md">
                <Link to="/" className="mb-4 flex items-center gap-3 font-heading text-lg font-extrabold text-blue-800 no-underline">
                    <span aria-hidden="true" className="logo-mark">A</span>
                    Aarohan Open University
                </Link>
                <p className="section-eyebrow">Admission</p>
                <h1 className="section-title">Register</h1>
                <p className="mt-1 text-sm text-slate-600">Apply for admission.</p>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name</label>
                        <input id="name" name="name" type="text" className="form-control" placeholder="Enter Your Name"
                            value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
                        <input id="email" name="email" type="email" className="form-control" placeholder="Enter Your Email"
                            value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-semibold">Password</label>
                        <input id="password" name="password" type="password" className="form-control" placeholder="Enter Your Password"
                            value={form.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" className="form-control" placeholder="Re-enter Your Password"
                            value={form.confirmPassword} onChange={handleChange} required />
                    </div>

                    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Registering…" : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Do have any Account?{" "}
                    <Link to="/login" className="font-semibold text-blue-700 underline">Login</Link>
                </p>
                <p className="mt-2 text-sm">
                    <Link to="/" className="text-slate-600 underline">← Back to Home</Link>
                </p>
            </div>
        </main>
    );
}

export default Register;
