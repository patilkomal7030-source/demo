import React from 'react';

export default function LoginPage({ values, onChange, onSubmit, busy, status }) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            value={values.email}
            onChange={(event) => onChange('email', event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={values.password}
            minLength={6}
            onChange={(event) => onChange('password', event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
      </form>

      {status.error && <p className="message error">{status.error}</p>}
      {status.success && (
        <div className="message success">
          <p>{status.success}</p>
          <p className="micro">
            {status.user?.name} • {status.user?.email}
          </p>
        </div>
      )}
    </>
  );
}
