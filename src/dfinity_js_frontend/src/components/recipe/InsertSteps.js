import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import {toast} from 'react-toastify';
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import { addStepToRecipe, getSteps as getStepsList } from "../../utils/recipe";

const InsertSteps = ({recipeId}) => {

    const [ step , setStep ] = useState("");

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleInsertStep = async () => {
        try {
            await addStepToRecipe(recipeId, step);
            toast(<NotificationSuccess text="Step Insert successfully." />);

        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Step insert not successfully." />);
        }
    }
  return (
    <>
    <Button variant="primary"
        className="mb-3"
    
    onClick={handleShow}>
        Insert Step
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Insert Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Step</Form.Label>
                    <Form.Control type="text" placeholder="Enter Step" value={step} onChange={(e) => setStep(e.target.value)} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleInsertStep}>
                Insert
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default InsertSteps