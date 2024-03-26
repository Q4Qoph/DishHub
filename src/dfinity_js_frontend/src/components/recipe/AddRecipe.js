import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddRecipe = ({save}) => {

    const [name , setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");


    const isFormFilled = () => name && description && category && author;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Button variant="primary" onClick={handleShow}>
            Add Recipe
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control
                    type="text"
                    placeholder="Enter recipe name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                <FloatingLabel controlId="floatingInput" label="Description">
                    <Form.Control
                    type="text"
                    placeholder="Enter recipe description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                <FloatingLabel controlId="floatingInput" label="Category">
                    <Form.Control
                    type="text"
                    placeholder="Enter recipe category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAuthor">
                <FloatingLabel controlId="floatingInput" label="Author">
                    <Form.Control
                    type="text"
                    placeholder="Enter recipe author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    />
                </FloatingLabel>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button
                variant="primary"
                onClick={() => {
                    save({name, description, category, author});
                    handleClose();
                }}
                disabled={!isFormFilled()}
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default AddRecipe