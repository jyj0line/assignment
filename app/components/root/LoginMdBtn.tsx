"use client";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { LoginForm } from "@/app/components/root/LoginForm";

export const LoginMdBtn = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose} id="loginModal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
};