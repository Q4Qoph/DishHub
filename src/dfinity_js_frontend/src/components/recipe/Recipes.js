import React, { useEffect, useState } from 'react'
import { createIngredient, createRecipe, getIngredients as getIngredientsList, getRecipes as getRecipesList, searchRecipes, sortRecipesByCategory } from '../../utils/recipe';
import AddIngredient from '../ingredient/AddIngredient';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import Loader from '../utils/Loader';
import { NotificationError, NotificationSuccess } from '../utils/Notifications';
import { toast } from 'react-toastify';
import { Row, Button, InputGroup, Form } from 'react-bootstrap';



const Recipes = () => {

    const [recipes, setRecipes] = useState([]);
    const [searchRecipe, setSearchRecipe] = useState('');
    const [loading, setLoading] = useState(false);


    const search = async (searchTerm) => {
      try {
        setLoading(true);
        await searchRecipes(searchTerm).then((res) => {
          setRecipes(res.Ok)
          console.log("first", res.Ok)
        })
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    };

    const filterByCategory = async (filterTerm) => {
      try {
        setLoading(true);
        setRecipes(await sortRecipesByCategory(filterTerm));
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    };

    const getRecipes = async () => {
        try {
            setLoading(true);
            const recipes = await getRecipesList();
            setRecipes(recipes);
        } catch (error) {
            toast(<NotificationError text="Failed to get Recipes." />);
        } finally {
            setLoading(false);
        }
    }

    const getIngredients = async () => {
        try {
            setLoading(true);
            await getIngredientsList();
        } catch (error) {
            toast(<NotificationError text="Failed to get Ingredients." />);
        } finally {
            setLoading(false);
        }
    }

    const addIngredient = async (data) => {
        try {
          setLoading(true);
          const quantityStr = data.quantity;
          data.quantity = parseInt(quantityStr);
          createIngredient(data).then((resp) => {
            getIngredients();
          });
          toast(<NotificationSuccess text="Ingredient added successfully." />);
        } catch (error) {
          console.log({ error });
          toast(<NotificationError text="Failed to create a Ingredient." />);
        } finally {
          setLoading(false);
        }
     };

    const addRecipe = async (data) => {
        try {
          setLoading(true);
          createRecipe(data).then((resp) => {
            getRecipes();
          });
          toast(<NotificationSuccess text="Recipe added successfully." />);
        } catch (error) {
          console.log({ error });
          toast(<NotificationError text="Failed to create a Recipe." />);
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

  return (
    <>
    {!loading ? (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">Dish Hub</h1>
                <AddIngredient save={addIngredient} />
                <AddRecipe save={addRecipe} />
            </div>
            {/* Filter and Search Area */}

            <div className="d-flex justify-content-end align-items-center mb-4">
            <InputGroup className="mb-3 mx-2 mx-2">
              <Form.Control
                placeholder="Search by Name or Author" 
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchRecipe(e.target.value)}
              />
              <Button variant="dark" id="button-addon2"
                onClick={() => search(searchRecipe)}
              >
                Search
              </Button>
            </InputGroup>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button variant="outline-dark" onClick={() => getRecipes()}>All</Button>
            <Button variant="outline-dark" onClick={() => filterByCategory("breakfast")}>Breakfast</Button>
            <Button variant="outline-dark" onClick={() => filterByCategory("lunch")}>Lunch</Button>
            <Button variant="outline-dark" onClick={() => filterByCategory("dinner")}>Dinner</Button>
            <Button variant="outline-dark" onClick={() => filterByCategory("dessert")}>Dessert</Button>
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {recipes && recipes.map((_recipe, index) => (
                <Recipe key={index} recipe={{
                    ..._recipe
                }} />
                
                ))}
            </Row>
        </>
    ) : (
        <Loader />
        )}

    </>

         
  )
}

export default Recipes