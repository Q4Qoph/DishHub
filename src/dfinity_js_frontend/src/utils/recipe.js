import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

// addRecipe

export async function createRecipe(recipe) {
  return window.canister.recipe.addRecipe(recipe);
}

// addIngredient
export async function createIngredient(ingredient) {
  return window.canister.recipe.addIngredient(ingredient);
}

// getRecipes
export async function getRecipes() {
  return await window.canister.recipe.getRecipes();
}

// getSteps
export async function getSteps() {
  return await window.canister.recipe.getSteps();
}

// getIngredients
export async function getIngredients() {
  return await window.canister.recipe.getIngredients();
}

// getRecipe
export async function getRecipe(id) {
  return await window.canister.recipe.getRecipe(id);
}

// getIngredient
export async function getIngredient(id) {
  return await window.canister.recipe.getIngredient(id);
}

// updateRecipe
export async function updateRecipe(recipe) {
  return window.canister.recipe.updateRecipe(recipe);
}

// updateIngredient
export async function updateIngredient(ingredient) {
  return window.canister.recipe.updateIngredient(ingredient);
}

// deleteRecipe
export async function deleteRecipe(id) {
  return window.canister.recipe.deleteRecipe(id);
}

// deleteIngredient
export async function deleteIngredient(id) {
  return window.canister.recipe.deleteIngredient(id);
}

// addIngredientToRecipe
export async function addIngredientToRecipe(recipeId, ingredientId) {
  return window.canister.recipe.addIngredientToRecipe(recipeId, ingredientId);
}

// sortRecipesByCategory
export async function sortRecipesByCategory(category) {
  return window.canister.recipe.sortRecipesByCategory(category);
}

// searchRecipes
export async function searchRecipes(query) {
  return window.canister.recipe.searchRecipes(query);
}

//removeIngredientFromRecipe
export async function removeIngredientFromRecipe(recipeId, ingredientId) {
  return window.canister.recipe.removeIngredientFromRecipe(recipeId, ingredientId);
}

// addStepToRecipe
export async function addStepToRecipe(recipeId, step) {
  return window.canister.recipe.addStepToRecipe(recipeId, step);
}

// removeStepFromRecipe
export async function removeStepFromRecipe(recipeId, stepId) {
  return window.canister.recipe.removeStepFromRecipe(recipeId, stepId);
}
export async function getProducts() {
  try {
    return await window.canister.marketplace.getProducts();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

