import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Stack, Row, Modal, Form, InputGroup} from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateIngredient from "../ingredient/UpdateIngredient";
import DeleteIngredient from "../ingredient/DeleteIngredient";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import { removeIngredientFromRecipe, removeStepFromRecipe } from "../../utils/recipe";
import UpdateRecipe from "./UpdateRecipe";
import DeleteRecipe from "./DeleteRecipe";
import InsertIngredients from "./InsertIngredients";
import InsertSteps from "./InsertSteps";

const Recipe = ({recipe}) => {
  
    const { id, name, description, category, author, ingredients, steps } = recipe;

    const handleRemoveIngredient = async (ingredientId) => {
        try {
            await removeIngredientFromRecipe(id, ingredientId);
            toast(<NotificationSuccess text="Ingredient Removed successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Ingredient Removal not successfully." />);
        }
    }

    const handleRemoveStep = async (stepId) => {
        try {
            await removeStepFromRecipe(id, stepId);
            toast(<NotificationSuccess text="Step Removed successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Step Removal not successfully." />);
        }
    }


  return (
    <> 
    <Card className="mb-3 mr-2">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>
          {category}
        </Card.Text>
        <Card.Text>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id} style={{marginBottom: "2px"}}>
                {ingredient.name} {"   "}
                {ingredient.quantity.toString()}{" "}
                {ingredient.unit}
                <Button
                    variant="danger"
                    className="rounded-pill px-0" style={{ width: "38px", marginLeft: "8px"}}
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                    >
                    <i className="bi bi-trash" ></i>
                </Button>
              </li>
            ))}
          </ul>
        </Card.Text>
        <InsertIngredients recipeId={id} />
        <Card.Text>
          <h5>Steps</h5>
          <ol>
            {steps.map((step) => (
              <li key={step.id}>
                {step.step}
                <Button variant="danger"
                    className="rounded-pill px-0" style={{ width: "38px", marginLeft: "8px"}}
                    onClick={() => handleRemoveStep(step.id)}
                    >
                    <i className="bi bi-trash" ></i>
                </Button>
              </li>
            ))}
          </ol>
        </Card.Text>
        <InsertSteps recipeId={id} />
        <div className="d-flex justify-content-end align-items-center">
        <Stack direction="horizontal" gap={3} >
          <UpdateRecipe recipeId={id} />
          <DeleteRecipe recipeId={id} />
        </Stack>
        </div>
      </Card.Body>
    </Card>
    </>
  )
}

export default Recipe