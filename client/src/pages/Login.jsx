import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from "../api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.post('/login', { email, password });
            console.log('response: ', res.data);

            if (!res.data || !res.data.success) {
                setError(res.data?.message || 'Login failed');
                return;
            }

            // server returns user under res.data.user
            const userData = res.data.user || res.data.data || res.data;
            localStorage.setItem('user', JSON.stringify(userData));

            if (userData.role === 'ADMIN') navigate('/admin');
            else if (userData.role === 'MANAGER') navigate('/manager');
            else navigate('/employee');
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Something went wrong";
            setError(msg);
            console.error('Login error:', err);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border bg-transparent text-black text-sm">
                <h2 className="text-2xl font-semibold text-center">Log In</h2>
                <p className="text-black mt-1 text-center">Login to your account</p>
                <form className="mt-8" onSubmit={handleLogin}>
                    <label htmlFor="email" className="block mb-1 font-medium text-black">Email address</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className="w-full p-2 mb-3 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />

                    <label htmlFor="password" className="block mb-1 font-medium text-black">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                        className="w-full p-2 mb-2 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />

                    <button type="submit" className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer active:bg-indigo-800">Log in</button>
                </form>
                {
                    error && <p className="text-red-500 mt-2">{error}</p>
                }
            </div>
        </>
    );
};

export default Login