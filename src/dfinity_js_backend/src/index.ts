import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import {
    Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal
} from "azle/canisters/ledger";
import { id } from "azle/src/lib/ic/id";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

const Ingredients = Record({
    id  : text,
    name: text,
    quantity: nat64,
    unit: text,
});

const Step = Record({
    id: text,
    step: text,
});

const Recipe = Record({
    id: text,
    name: text,
    description: text,
    category: text, // category of the recipe (e.g. breakfast, lunch, dinner, dessert)
    author: text,
    ingredients: Vec(Ingredients),
    steps: Vec(Step), // List of steps to prepare the recipe
});




const IngredientsPayload = Record({
    name: text,
    quantity: nat64,
    unit: text,
});

const RecipePayload = Record({
    name: text,
    description: text,
    category: text,
    author: text,
});



const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text
});


const ingredientStorage = StableBTreeMap(0,text, Ingredients)
const recipeStorage =  StableBTreeMap(1,text, Recipe)
const stepStorage =  StableBTreeMap(2,text, Step)



const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

export default Canister({

    // Create a Recipe
    addRecipe: update([RecipePayload], Result(Recipe, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }
        const recipe = { id: uuidv4(), ingredients: [], steps: [], ...payload };
        recipeStorage.insert(recipe.id, recipe);
        return Ok(recipe);
    }
    ),

    // Delete a recipe by id
    deleteRecipe: update([text], Result(Recipe, Message), (id) => {
        const deletedRecipeOpt = recipeStorage.get(id);
        if ("None" in deletedRecipeOpt) {
            return Err({ NotFound: `cannot delete the recipe: recipe with id=${id} not found` });
        }
        recipeStorage.remove(id);
        return Ok(deletedRecipeOpt.Some);
    }
    ),

    //update a recipe
    updateRecipe: update([Recipe], Result(Recipe, Message), (payload) => {
        const recipeOpt = recipeStorage.get(payload.id);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `cannot update the recipe: recipe with id=${payload.id} not found` });
        }
        recipeStorage.insert(recipeOpt.Some.id, payload);
        return Ok(payload);
    }
    ),

    // Get all recipes
    getRecipes: query([], Vec(Recipe),() => {
        return recipeStorage.values();
    }),

    // get all steps
    getSteps: query([], Vec(Step),() => {
        return stepStorage.values();
    }),

    // Get a recipe by id
    getRecipe: query([text], Result(Recipe, Message), (id) => {
        const recipeOpt = recipeStorage.get(id);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `recipe with id=${id} not found` });
        }
        return Ok(recipeOpt.Some);
    }
    ),
    // Get all ingredients
    getIngredients: query([], Vec(Ingredients),() => {
        return ingredientStorage.values();
    }),

    // Get an ingredient by id
    getIngredient: query([text], Result(Ingredients, Message), (id) => {
        const ingredientOpt = ingredientStorage.get(id);
        if ("None" in ingredientOpt) {
            return Err({ NotFound: `ingredient with id=${id} not found` });
        }
        return Ok(ingredientOpt.Some);
    }
    ),
    // Create an Ingredient
    addIngredient: update([IngredientsPayload], Result(Ingredients, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "invalid payoad" })
        }
        const ingredient = { id: uuidv4(), ...payload };
        ingredientStorage.insert(ingredient.id, ingredient);
        return Ok(ingredient);
    }
    ),

    // Delete an ingredient by id
    deleteIngredient: update([text], Result(Ingredients, Message), (id) => {
        const deletedIngredientOpt = ingredientStorage.get(id);
        if ("None" in deletedIngredientOpt) {
            return Err({ NotFound: `cannot delete the ingredient: ingredient with id=${id} not found` });
        }
        ingredientStorage.remove(id);
        return Ok(deletedIngredientOpt.Some);
    }
    ),

    //update an ingredient
    updateIngredient: update([Ingredients], Result(Ingredients, Message), (payload) => {
        const ingredientOpt = ingredientStorage.get(payload.id);
        if ("None" in ingredientOpt) {
            return Err({ NotFound: `cannot update the ingredient: ingredient with id=${payload.id} not found` });
        }
        ingredientStorage.insert(ingredientOpt.Some.id, payload);
        return Ok(payload);
    }
    ),

    // sort recipes by category
    sortRecipesByCategory: query([text], Vec(Recipe), (category) => {
        return recipeStorage.values().filter((recipe) => recipe.category.toLowerCase() === category.toLowerCase());
    }
    ),
    //Search for a recipe and return the result as a list of recipes or an error message
    searchRecipes: query([text], Result(Vec(Recipe), Message), (searchTerm) => {
        const lowerCaseSearchInput = searchTerm.toLowerCase();
        try {
            const searchedRecipes = recipeStorage.values().filter((recipe) => recipe.name.toLowerCase().includes(lowerCaseSearchInput) || recipe.author.toLowerCase().includes(lowerCaseSearchInput));
            return Ok(searchedRecipes);
        } catch (error) {
            return Err({ NotFound: `Recipe with the term ${searchTerm} has not been found in title or Author` });
        }
    }
    ),

    // insert an ingredient into a recipe
    addIngredientToRecipe: update([text, text], Result(Recipe, Message), (recipeId, ingredientId) => {
        const recipeOpt = recipeStorage.get(recipeId);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `cannot add ingredient to recipe: recipe with id=${recipeId} not found` });
        }
        const ingredientOpt = ingredientStorage.get(ingredientId);
        if ("None" in ingredientOpt) {
            return Err({ NotFound: `cannot add ingredient to recipe: ingredient with id=${ingredientId} not found` });
        }
        recipeOpt.Some.ingredients.push(ingredientOpt.Some);
        recipeStorage.insert(recipeId, recipeOpt.Some);
        return Ok(recipeOpt.Some);
    }
    ),
    // remove an ingredient from a recipe
    removeIngredientFromRecipe: update([text, text], Result(Recipe, Message), (recipeId, ingredientId) => {
        const recipeOpt = recipeStorage.get(recipeId);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `cannot remove ingredient from recipe: recipe with id=${recipeId} not found` });
        }
        const ingredientOpt = ingredientStorage.get(ingredientId);
        if ("None" in ingredientOpt) {
            return Err({ NotFound: `cannot remove ingredient from recipe: ingredient with id=${ingredientId} not found` });
        }
        const recipe = recipeOpt.Some.ingredients ;

        for (let i = 0; i < recipe.length; i++) {
            if (recipe[i].id === ingredientId) {
                recipe.splice(i, 1);
                break;
            }
        }

        recipeOpt.Some.ingredients = recipe;
        recipeStorage.insert(recipeId, recipeOpt.Some);
        return Ok(recipeOpt.Some);
    }
    ),

   

    
    // insert a step into a recipe
    addStepToRecipe: update([text, text], Result(Recipe, Message), (recipeId, step) => {
        const recipeOpt = recipeStorage.get(recipeId);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `cannot add step to recipe: recipe with id=${recipeId} not found` });
        }
        const newStep = addStep(step);
        recipeOpt.Some.steps.push(newStep);
        recipeStorage.insert(recipeId, recipeOpt.Some);
        return Ok(recipeOpt.Some);
        
    }
    ),
    
    // remove a step from a recipe
    removeStepFromRecipe: update([text, text], Result(Recipe, Message), (recipeId, stepId) => {
        const recipeOpt = recipeStorage.get(recipeId);
        if ("None" in recipeOpt) {
            return Err({ NotFound: `cannot remove step from recipe: recipe with id=${recipeId} not found` });
        }
        const recipe = recipeOpt.Some.steps;
        for (let i = 0; i < recipe.length; i++) {
            if (recipe[i].id === stepId) {
                recipe.splice(i, 1);
                break;
            }
        }
        recipeOpt.Some.steps = recipe;
        recipeStorage.insert(recipeId, recipeOpt.Some);
        return Ok(recipeOpt.Some);
    }
    ),   
    
});

// Helper function to add step
function addStep(step: text){
    const newStep = { id: uuidv4(), step };
    stepStorage.insert(newStep.id, newStep);
    return newStep;
}


// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};



