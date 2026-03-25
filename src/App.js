import { useState } from 'react';
import './App.css';

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

  return (
    <div className="App">
      <header className="hero">
        <p className="eyebrow">Demo Auth</p>
        <h1>Registration and login sandbox</h1>
        <p>
          Two forms talk to the backend you can run with <code>node backend/server.js</code>.
        </p>
      </header>

      <div className="grid">
        <section className="card">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label>
              Name
              <input
                type="text"
                value={registerValues.name}
                onChange={(event) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    name: event.target.value
                  }))
                }
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={registerValues.email}
                onChange={(event) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    email: event.target.value
                  }))
                }
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={registerValues.password}
                onChange={(event) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    password: event.target.value
                  }))
                }
                minLength={6}
                required
              />
            </label>

            <button type="submit" disabled={busy.register}>
              {busy.register ? 'Registering…' : 'Create account'}
            </button>
          </form>
          {registerStatus.error && <p className="message error">{registerStatus.error}</p>}
          {registerStatus.success && (
            <div className="message success">
              <p>{registerStatus.success}</p>
              <p className="micro">
                {registerStatus.user?.name || 'Anonymous'} • {registerStatus.user?.email}
              </p>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginValues.email}
                onChange={(event) =>
                  setLoginValues((prev) => ({
                    ...prev,
                    email: event.target.value
                  }))
                }
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={loginValues.password}
                onChange={(event) =>
                  setLoginValues((prev) => ({
                    ...prev,
                    password: event.target.value
                  }))
                }
                minLength={6}
                required
              />
            </label>

            <button type="submit" disabled={busy.login}>
              {busy.login ? 'Checking…' : 'Log in'}
            </button>
          </form>
          {loginStatus.error && <p className="message error">{loginStatus.error}</p>}
          {loginStatus.success && (
            <div className="message success">
              <p>{loginStatus.success}</p>
              <p className="micro">
                {loginStatus.user?.name} • {loginStatus.user?.email}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
