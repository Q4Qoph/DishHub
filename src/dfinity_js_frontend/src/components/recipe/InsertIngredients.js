import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Table } from "react-bootstrap";
import {toast} from 'react-toastify';
import { addIngredientToRecipe, getIngredients as getIngredientsList } from "../../utils/recipe";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import UpdateIngredient from "../ingredient/UpdateIngredient";
import DeleteIngredient from "../ingredient/DeleteIngredient";

const InsertIngredients = ({recipeId}) => {

    const [ingredients, setIngredients] = useState([]);

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // getIngredients
    const getIngredients = async () => {
        try {
            setLoading(true);
            const ingredients = await getIngredientsList();
            setIngredients(ingredients);
        } catch (error) {
            toast(<NotificationError text="Failed to get Ingredients." />);
        } finally {
            setLoading(false);
        }
    }

    const handleInsertIngredient = async (ingredientId) => {
        try {
            await addIngredientToRecipe(recipeId, ingredientId);
            toast(<NotificationSuccess text="Ingredient Insert successfully." />);

        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Ingredient insert not successfully." />);
        }
    }

    useEffect(() => {
        getIngredients();
    }, []);

  return (
    <>
    <Button variant="primary"       
      className="mb-3"
        onClick={handleShow}>
        Insert Ingredients
    </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Insert Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient, index) => (
                        <tr key={ingredient.id}>
                            <td>{index + 1}</td>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.quantity.toString()}</td>
                            <td>{ingredient.unit}</td>
                            <td className="d-flex justify-content-between">
                                <Button
                                    variant="primary"
                                    
                                    onClick={() => handleInsertIngredient(ingredient.id)}
                                >
                                    Insert
                                </Button>

                                <UpdateIngredient ingredientId={ingredient.id} />
                                <DeleteIngredient ingredientId={ingredient.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default InsertIngredients