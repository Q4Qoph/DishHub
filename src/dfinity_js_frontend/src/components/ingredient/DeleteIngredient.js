import React from 'react'
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from '../utils/Notifications';
import { deleteIngredient } from '../../utils/recipe';

const DeleteIngredient = ({ingredientId}) => {
    const removeIngredient =  () => {
        try {
          deleteIngredient(ingredientId);
          toast(<NotificationSuccess text="Ingredient removed successfully." />);
        } catch (error) {
          console.log({error});
          toast(<NotificationError text="Failed to Remove a Ingredient" />);
        }
      }
  return (
    <Button variant="danger" className="rounded-pill px-0" style={{ width: "38px" }}
        onClick={() => { 
            removeIngredient()
        }}
    >
      <i class="bi bi-trash"></i>
    </Button>
  )
}

export default DeleteIngredient