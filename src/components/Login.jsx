import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { loginUser, saveUser } from "../data/auth.js";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const successMessage = location.state?.message;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await loginUser(form);
            saveUser(data.user);
            navigate("/");
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
                <p className="section-eyebrow">Welcome back</p>
                <h1 className="section-title">Login</h1>

                {successMessage && (
                    <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
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

                    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Logging in…" : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Doesn't have Account?{" "}
                    <Link to="/register" className="font-semibold text-blue-700 underline">Register</Link>
                </p>
                <p className="mt-2 text-sm">
                    <Link to="/" className="text-slate-600 underline">← Back to Home</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;
