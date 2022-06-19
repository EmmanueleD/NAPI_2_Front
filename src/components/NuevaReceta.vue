<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <h2>Nueva receta</h2>
        <div class="grid col-fixed" style="max-width: 600px">
          <h5>Nombre</h5>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="newRecipe.name"
              id="name"
              :class="{ 'p-invalid': newRecipe.name.length <= 0 }"
            />
          </div>

          <h5>Ingredientes</h5>

          <div class="p-inputgroup">
            <AutoComplete
              placeholder="Busca un ingrediente..."
              v-model="newIngredient"
              :suggestions="filteredIngredients"
              @complete="newIngredientSelected($event)"
              @item-select="addIngredient"
              field="name"
            />
          </div>
          <div
            class="ingredientsList w-full mt-3 px-3"
            v-if="newRecipe.ingredients.length > 0"
          >
            <div
              class="ingredientItem w-full grid my-3"
              v-for="ingredient in newRecipe.ingredients"
              :key="ingredient.id"
            >
              <div
                class="
                  col-12
                  md:col-3
                  flex
                  justify-content-start
                  align-items-center
                "
              >
                {{ ingredient.name }}
              </div>
              <div
                class="
                  col-10
                  md:col-4
                  flex
                  justify-content-start
                  align-items-center
                "
              >
                <InputNumber
                  v-model="ingredient.qty"
                  :placeholder="'cantidad en la receta...'"
                ></InputNumber>
              </div>
              <div
                class="
                  col-2
                  md:col-3
                  flex
                  justify-content-end
                  align-items-center
                "
              >
                <div class="flex justify-content-end">
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-danger"
                    @click="
                      deleteIngredientFromRecipeIngredientsList(ingredient)
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          icon="pi pi-plus"
          label="Crear receta"
          style="margin-left: 50%"
          class="p-button-rounded p-button-success mt-3"
          :disabled="
            newRecipe.name.length <= 0 || newRecipe.ingredients.length == 0
          "
          @click="postNewRecipe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsService from "../service/IngredientsService";
import RecipesService from "../service/RecipesService";

export default {
  name: "NuevaReceta",
  data() {
    return {
      newRecipe: {
        name: "",
        ingredients: [],
      },
      tmpIngredient: {
        id: 0,
        qty: 0,
      },
      newIngredient: "",
      ingredientsList: [],
      filteredIngredients: [],
    };
  },
  recipesService: null,
  ingredientsService: null,
  created() {
    this.recipesService = new RecipesService();
    this.ingredientsService = new IngredientsService();
  },
  mounted() {
    this.ingredientsService.getAllIngredients().then((res) => {
      this.ingredientsList = res;
    });
  },
  methods: {
    resetData() {
      this.newRecipe = {
        name: "",
        ingredients: [],
      };
      this.tmpIngredient = {
        id: 0,
        qty: 0,
      };
      this.newIngredient = "";
    },
    postNewRecipe() {
      this.recipesService.createRecipe(this.newRecipe).then(() => {
        try {
          this.resetData();
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Receta creada ",
            life: 3000,
          });
        } catch {
          this.resetData();

          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error in ''create new recipe''",
            life: 3000,
          });
        }
      });
    },

    deleteIngredientFromRecipeIngredientsList(ingredientToDelete) {
      let indexToDelete =
        this.newRecipe.ingredients.indexOf(ingredientToDelete);

      if (indexToDelete > -1) {
        this.newRecipe.ingredients.splice(indexToDelete, 1);
      }
    },
    newIngredientSelected(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredIngredients = [...this.ingredientsList];
        } else {
          this.filteredIngredients = this.ingredientsList.filter(
            (ingredient) => {
              return ingredient.name
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            }
          );
        }
      }, 250);
    },
    addIngredient() {
      if (this.newIngredient.id) {
        this.newRecipe.ingredients.unshift(this.newIngredient);
      }
    },
  },
};
</script>