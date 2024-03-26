import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddIngredient = ({ save }) => {

    const [name , setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");

    const isFormFilled = () => name && quantity && unit;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Button variant="primary" onClick={handleShow}>
            Add Ingredient
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Ingredient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control
                    type="text"
                    placeholder="Enter ingredient name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                <FloatingLabel controlId="floatingInput" label="Quantity">
                    <Form.Control
                    type="number"
                    placeholder="Enter ingredient quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUnit">
                <FloatingLabel controlId="floatingInput" label="Unit">
                    <Form.Control
                    type="text"
                    placeholder="Enter ingredient unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {isFormFilled() && (
                <Button
                variant="primary"
                onClick={() => {
                    save({ name, quantity, unit });
                    handleClose();
                }}
                >
                Save
                </Button>
            )}
            </Modal.Footer>
        </Modal>
        
    </>
  )
}

export default AddIngredient