import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getIngredient, updateIngredient } from '../../utils/recipe';
import { NotificationError, NotificationSuccess } from '../utils/Notifications';

const UpdateIngredient = ({ingredientId}) => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const ingredient = await getIngredient(ingredientId);
                setName(ingredient.name);
                setQuantity(ingredient.quantity);
                setUnit(ingredient.unit);
  
            } catch (error) {
                console.error(error);
            }
        };
  
        fetchIngredient();
    }, [ingredientId]);

    const Update = async () => {
        try {
            const parsQuantity = parseInt(quantity)
            await updateIngredient({
                id: ingredientId,
                name,
                quantity: parsQuantity,
                unit,
            });
            toast(<NotificationSuccess text="Ingredient updated successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to update a Ingredient." />);
        }
      }

    return (
        <>

            <Button variant="success" className="rounded-pill px-0" style={{ width: "38px"}}  onClick={handleShow}>
                <i className="bi bi-pencil"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <FloatingLabel controlId="floatingInput" label="Name">
                                <Form.Control type="text" placeholder="Enter name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <FloatingLabel controlId="floatingInput" label="Quantity">
                                <Form.Control type="number" placeholder="Enter quantity" defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUnit">
                            <FloatingLabel controlId="floatingInput" label="Unit">
                                <Form.Control type="text" placeholder="Enter unit" defaultValue={unit} onChange={(e) => setUnit(e.target.value)} />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={Update}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default UpdateIngredient