export default class IngredientsService {
  
  getAllIngredients(){
    return fetch('localhost:3000/api/getIngredients').then(res => res.json()).then(d => d)
  }

  // getIngredient()

  // createIngredient()
  
  // editIngredient()

  // deleteIngredient()

}