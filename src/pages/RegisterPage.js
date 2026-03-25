import React from 'react';

export default function RegisterPage({ values, onChange, onSubmit, busy, status }) {
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={values.name}
            onChange={(event) => onChange('name', event.target.value)}
            required
          />
        </label>

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
          {busy ? 'Registering…' : 'Create account'}
        </button>
      </form>

      {status.error && <p className="message error">{status.error}</p>}
      {status.success && (
        <div className="message success">
          <p>{status.success}</p>
          <p className="micro">
            {status.user?.name || 'Anonymous'} • {status.user?.email}
          </p>
        </div>
      )}
    </>
  );
}
