import axios from 'axios'

const BASIC_URL = 'https://napi2.herokuapp.com/api/recipes_'

export default class IngredientsService {

  getRecipes(){
    return axios.get(BASIC_URL + "simple")
     .then(res => res.data)
  }

  getRecipesWIngredients(){
    return axios.get(BASIC_URL + "complete")
     .then(res => res.data)
  }

  getRecipeById(id){
    return axios.get(BASIC_URL + "/" +id)
     .then(res => res.data)
  }

  createRecipe(obj){
    return axios.post(BASIC_URL, obj)
     .then(res => res.data)
  }

  editRecipeName(obj, id){
    return axios.put(BASIC_URL + "editname/" + id, obj)
     .then(res => res.data)
  }
  
  editIngredientQty(id_recipe, id_ingredient, qty){
    return axios.put(BASIC_URL + "editingredient/" + id_recipe+"/"+id_ingredient+"/"+qty)
     .then(res => res.data)
  }

  addIngredient(id_recipe, id_ingredient, qty){
    return axios.post(BASIC_URL + "addingredient/"+ id_recipe+"/"+id_ingredient+"/"+qty)
     .then(res => res.data)
  }

  deleteIngredient(id_recipe, id_ingredient){
    return axios.delete(BASIC_URL + "deleteingredient/"+ id_recipe+"/"+id_ingredient)
  }

  deleteRecipe(id){
    return axios.delete(BASIC_URL + "/" +id)
     .then(res => res.data)
  }
}