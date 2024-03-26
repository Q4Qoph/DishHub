import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getRecipe, updateRecipe } from '../../utils/recipe';
import { NotificationError, NotificationSuccess } from '../utils/Notifications';


const UpdateRecipe = ({recipeId}) => {

    const [name , setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipe = await getRecipe(recipeId);
                const rec = recipe.Ok;
                setName(rec.name);
                setDescription(rec.description);
                setCategory(rec.category);
                setAuthor(rec.author);
                setIngredients(rec.ingredients);
                setSteps(rec.steps);

  
            } catch (error) {
                console.error(error);
            }
        };
  
        fetchRecipe();
    }, [recipeId]);


  const Update = async () => {
    try {
        await updateRecipe({
            id: recipeId,
            name,
            description,
            category,
            author,
            ingredients,
            steps
        });
        toast(<NotificationSuccess text="Recipe updated successfully." />);
    } catch (error) {
        console.log({ error });
        toast(<NotificationError text="Failed to update a Recipe." />);
    }
  }
  return (
    <>
        <Button variant="success"
            className="rounded-pill px-0"
            style={{ width: "38px", margin: "2px"}}
            onClick={handleShow}>
            <i className="bi bi-pencil"></i>
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update Recipe</Modal.Title>
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
            <Button variant="primary" onClick={Update}>
                Update
            </Button>
            </Modal.Footer>
        </Modal>

    </>
  )
}

export default UpdateRecipe