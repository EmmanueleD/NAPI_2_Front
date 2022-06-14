import axios from 'axios'

const BASIC_URL = 'https://napi2-production.up.railway.app/api/ingredients/'

export default class IngredientsService {
  // getIngredient()
  getAllIngredients(){
    return axios.get(BASIC_URL)
    .then(res => res.data)
  }

  getIngredientById(id){
    return axios.get(BASIC_URL + id)
    .then(res => res.data)
  }
  // createIngredient()
  newIngredient(obj){
    return axios.post(BASIC_URL, obj)
    .then(res => res.data)
  }
  // editIngredient()
  editIngredient(obj, id){
    return axios.put(BASIC_URL + id, obj)
    .then(res => res.data)
  }
  // deleteIngredient()
  deleteIngredient(id){
    return axios.delete(BASIC_URL + id)
    .then(res => res.data)
  }
}