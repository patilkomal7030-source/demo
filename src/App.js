import { useState } from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const initialRegister = { name: '', email: '', password: '' };
const initialLogin = { email: '', password: '' };

async function callAuth(endpoint, body) {
  const response = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'unexpected server response');
  }
  return data;
}

function App() {
  const [activePage, setActivePage] = useState('register');
  const [registerValues, setRegisterValues] = useState(initialRegister);
  const [loginValues, setLoginValues] = useState(initialLogin);
  const [registerStatus, setRegisterStatus] = useState({});
  const [loginStatus, setLoginStatus] = useState({});
  const [busy, setBusy] = useState({ register: false, login: false });

  const handleRegister = async (event) => {
    event.preventDefault();
    setBusy((prev) => ({ ...prev, register: true }));
    setRegisterStatus({});

    try {
      const data = await callAuth('register', registerValues);
      setRegisterStatus({ success: data.message, user: data.user });
      setRegisterValues(initialRegister);
    } catch (error) {
      setRegisterStatus({ error: error.message });
    } finally {
      setBusy((prev) => ({ ...prev, register: false }));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setBusy((prev) => ({ ...prev, login: true }));
    setLoginStatus({});

    try {
      const data = await callAuth('login', loginValues);
      setLoginStatus({ success: data.message, user: data.user });
      setLoginValues(initialLogin);
    } catch (error) {
      setLoginStatus({ error: error.message });
    } finally {
      setBusy((prev) => ({ ...prev, login: false }));
    }
  };

  const updateRegisterField = (field, value) => {
    setRegisterValues((prev) => ({ ...prev, [field]: value }));
  };

  const updateLoginField = (field, value) => {
    setLoginValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="App">
      <header className="hero">
        <p className="eyebrow">Demo Auth</p>
        <h1>Registration and login sandbox</h1>
        <p>
          Run <code>node backend/server.js</code> and toggle between the two pages below.
        </p>
      </header>

      <nav className="tabs" aria-label="authentication pages">
        <button
          type="button"
          className={activePage === 'register' ? 'active' : ''}
          onClick={() => setActivePage('register')}
        >
          Register
        </button>
        <button
          type="button"
          className={activePage === 'login' ? 'active' : ''}
          onClick={() => setActivePage('login')}
        >
          Login
        </button>
      </nav>

      <section className="card">
        {activePage === 'register' ? (
          <RegisterPage
            values={registerValues}
            onChange={updateRegisterField}
            onSubmit={handleRegister}
            busy={busy.register}
            status={registerStatus}
          />
        ) : (
          <LoginPage
            values={loginValues}
            onChange={updateLoginField}
            onSubmit={handleLogin}
            busy={busy.login}
            status={loginStatus}
          />
        )}
      </section>
    </div>
  );
}

export default App;
