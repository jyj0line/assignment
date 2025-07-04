"use client";

import { useState } from "react";
import { Form, Button, Alert, InputGroup, FloatingLabel } from "react-bootstrap";

import { signInPSF } from "@/app/lib/SFs/PSFs/authPSFs";
import { AuthentificationCs } from "@/app/lib/descriptions";

export const LoginForm = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signInPSF({ id, unhashed_pw: pw });
      if (res) {
        setError(res);
      }

      setLoading(false);
    } catch (error) {
      if (error instanceof Error &&
        'digest' in error &&
        typeof error.digest === 'string' &&
        error.digest.startsWith('NEXT_REDIRECT')) {
        throw error;
      }

      console.error(AuthentificationCs.LOG_IN_SOMETHING, error);
      setError(AuthentificationCs.LOG_IN_SOMETHING);
      
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>@</InputGroup.Text>
        <FloatingLabel label="ID">
          <Form.Control
            type="text"
            id="id"
            placeholder="ID"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
        </FloatingLabel>
      </InputGroup>
      
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-lock"></i>
        </InputGroup.Text>
        <FloatingLabel label="Password">
          <Form.Control
            type={showPw ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
        </FloatingLabel>

        <Button
          variant="light"
          type="button"
          className="border-secondary-subtle"
          onClick={() => setShowPw((prev) => !prev)}
          aria-label={showPw ? "Hide password" : "Show password"}
        >
          <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`}></i>
        </Button>
      </InputGroup>
      
      {error && (
      <Alert variant="danger" className="mt-2">
        {error}
      </Alert>
      )}
      
      <Button
        type="submit"
        variant="primary"
        className="w-100"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};