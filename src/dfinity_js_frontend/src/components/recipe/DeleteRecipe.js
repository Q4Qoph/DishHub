import React from 'react'
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from '../utils/Notifications';
import { deleteRecipe } from '../../utils/recipe';

const DeleteRecipe = ({recipeId}) => {


    const removeRecipe =  () => {
        try {
          deleteRecipe(recipeId);
          toast(<NotificationSuccess text="Recipe removed successfully." />);
        } catch (error) {
          console.log({error});
          toast(<NotificationError text="Failed to Remove a Recipe" />);
        }
      }

  return (
    <Button variant="danger" className="rounded-pill px-0" style={{ width: "38px" }}
        onClick={() => { 
            removeRecipe()
        }}
    >
      <i class="bi bi-trash"></i>
    </Button>
  )
}

export default DeleteRecipe