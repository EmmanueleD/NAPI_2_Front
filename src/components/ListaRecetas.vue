<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>DataView</h5>
        <DataView
          :value="computed_dataviewValue"
          :layout="layout"
          :paginator="true"
          :rows="9"
        >
          <template #header>
            <div
              class="flex align-items-center justify-content-between flex-wrap"
            >
              <div class="text-left">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    type="text"
                    v-model="inputFilter"
                    placeholder="Search"
                  />
                </span>
              </div>
              <div class="text-right">
                <DataViewLayoutOptions v-model="layout" />
              </div>
            </div>
          </template>
          <template #list="slotProps">
            <div class="col-12">
              <div
                class="
                  flex flex-column
                  md:flex-row
                  align-items-start
                  p-3
                  w-full
                "
              >
                <div style="min-width: 15%">
                  <span class="text-2xl font-semibold mb-2 align-self-start">
                    $ {{ slotProps.data.price.toFixed(2) }}</span
                  >
                </div>
                <!-- <img
                  :src="'images/product/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                /> -->
                <div class="flex-1 text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.recipe_name }}
                  </div>
                  <div>
                    <Chip
                      class="mr-2 mt-3"
                      v-for="item in slotProps.data.ingredients"
                      :key="item.ingredient_id"
                      :label="item.ingredient_name"
                    ></Chip>
                  </div>
                  <!-- <div class="mb-3">{{ slotProps.data.description }}</div> -->
                  <!-- <Rating
                    :modelValue="slotProps.data.rating"
                    :readonly="true"
                    :cancel="false"
                    class="mb-2"
                  ></Rating> -->
                  <!-- <div class="flex align-items-center">
                    <i class="pi pi-tag mr-2"></i>
                    <span class="font-semibold">{{
                      slotProps.data.category
                    }}</span>
                  </div> -->
                </div>

                <div
                  class="
                    flex flex-row
                    md:flex-column
                    justify-content-between
                    w-full
                    md:w-auto
                    align-items-center
                    md:align-items-end
                    mt-5
                    md:mt-0
                  "
                >
                  <Button
                    @click="confirmDeleteRecipe(slotProps.data)"
                    icon="pi pi-fw pi-trash"
                    label="Delete "
                    class="mb-2 p-button-danger"
                  ></Button>
                  <Button
                    @click="editRecipe(slotProps.data)"
                    icon="pi pi-fw pi-pencil"
                    label="Edit "
                    class="mb-2 p-button-info"
                  ></Button>

                  <!-- <span
                    :class="
                      'product-badge status-' +
                      slotProps.data.inventoryStatus.toLowerCase()
                    "
                    >{{ slotProps.data.inventoryStatus }}</span
                  > -->
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="col-12 md:col-6 xl:col-4">
              <div class="card m-3 border-1 surface-border">
                <div class="flex align-items-center justify-content-between">
                  <div class="flex align-items-center">
                    <!-- <i class="pi pi-tag mr-2"></i> -->
                    <!-- <span
                      :class="
                        'product-badge status-' +
                        slotProps.data.inventoryStatus.toLowerCase()
                      "
                      >{{ slotProps.data.inventoryStatus }}</span
                    > -->
                    <!-- <span class="font-semibold product-badge">{{
                      slotProps.data.category
                    }}</span> -->
                  </div>
                  <span class="text-2xl font-bold mt-2 mb-4">
                    $
                    {{ slotProps.data.price.toFixed(2) }}
                  </span>
                </div>
                <div class="text-center">
                  <!-- <img
                    :src="'images/product/' + slotProps.data.image"
                    :alt="slotProps.data.name"
                    class="w-9 shadow-2 my-3 mx-0"
                  /> -->
                  <div class="text-2xl font-bold">
                    {{ slotProps.data.recipe_name }}
                  </div>
                  <div class="my-3">
                    <Accordion>
                      <AccordionTab>
                        <template #header>
                          <i class="pi pi-calendar mr-3"></i>
                          <span>Ingredientes</span>
                        </template>
                        <DataTable
                          :value="slotProps.data.ingredients"
                          responsiveLayout="stack"
                        >
                          <Column field="ingredientName" header="Ingrediente">
                            <template #body="slotProps">
                              {{ slotProps.data.ingredient_name }}
                            </template>
                          </Column>
                          <Column field="qty" header="Cantidad">
                            <template #body="slotProps">
                              {{ slotProps.data.ingredient_qty }}
                            </template></Column
                          >
                          <Column field="price" header="Precio">
                            <template #body="slotProps">
                              {{ slotProps.data.ingrInRecipe_price.toFixed(2) }}
                            </template>
                          </Column>
                        </DataTable>
                      </AccordionTab>
                    </Accordion>

                    <!-- {{ slotProps.data.description }} -->
                  </div>
                  <!-- <Rating
                    :modelValue="slotProps.data.rating"
                    :readonly="true"
                    :cancel="false"
                  ></Rating> -->
                </div>
                <div class="flex align-items-center justify-content-between">
                  <Button
                    icon="pi pi-fw pi-trash"
                    label="Delete "
                    class="mb-2 p-button-danger"
                    @click="confirmDeleteRecipe(slotProps.data)"
                  ></Button>
                  <Button
                    @click="editRecipe(slotProps.data)"
                    icon="pi pi-fw pi-pencil"
                    label="Edit "
                    class="mb-2 p-button-info"
                  ></Button>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
    <Dialog
      v-model:visible="editDialog"
      :header="item.name"
      :modal="true"
      position="bottom"
      class="p-fluid mx-6 my-6"
    >
      <template #header><h2>Edit Recipe</h2></template>
      <div class="px-3 pt-4">
        <h5>Nobre Receta</h5>
        <div class="grid">
          <div class="mr-3">
            <InputText
              :placeholder="item.recipe_name"
              v-model="newName"
            ></InputText>
          </div>
          <!-- <div>
            <Button
              icon="pi pi-check"
              class="p-button-rounded p-button-info"
              @click="confirmDeleteProduct(ingredient)"
            />
          </div> -->
        </div>

        <h5>Ingredientes</h5>
        <div class="my-3">
          <div class="grid">
            <div class="col-8">
              <AutoComplete
                placeholder="Agrega un ingrediente..."
                v-model="newIngredient"
                :suggestions="filteredIngredients"
                @complete="newIngredientSelected($event)"
                @item-select="addIngredient"
                field="name"
              />
            </div>
            <div class="col-4">
              <!-- <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-success"
                @click="addIngredient"
              /> -->
            </div>
          </div>
        </div>
        <div
          v-for="ingredient in item.ingredients"
          :key="ingredient.ingredient_id"
          class="grid px-3"
        >
          <div class="col-4 flex justify-content-start align-items-center">
            {{ ingredient.ingredient_name }}
          </div>
          <div class="col-4 flex justify-content-center align-items-center">
            <InputNumber
              v-model="ingredient.ingredient_qty"
              :placeholder="ingredient.ingredient_qty"
            ></InputNumber>
          </div>
          <div class="col-4 flex justify-content-center align-items-center">
            <div class="flex justify-content-end">
              <!-- <Button
                icon="pi pi-check"
                class="p-button-rounded p-button-info mr-3"
                @click="confirmDeleteProduct(ingredient)"
              /> -->
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="confirmDeleteProduct(ingredient)"
              />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveRecipe"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="deleteRecipeDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      position="center"
      ><div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="recipe"
          >Quieres eliminar <b>{{ recipe.recipe_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeRecipeDeleteDialog"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteRecipe(recipe.recipe_id)"
        />
      </template>
    </Dialog>
    <Dialog
      v-model:visible="deleteIngredientDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      position="center"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="ingredient"
          >Quieres eliminar <b>{{ ingredient.ingredient_name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteIngredientDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteIngredient(item.recipe_id, ingredient.ingredient_id)"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import IngredientsService from "../service/IngredientsService";
import RecipesService from "../service/RecipesService";

export default {
  data() {
    return {
      deleteIngredientDialog: false,
      deleteRecipeDialog: false,

      newName: "",

      newIngredient: "",
      ingredientsList: [],
      filteredIngredients: [],

      ingredient: {},
      recipe: {},

      item: {},
      itemEdited: [],
      editDialog: false,

      inputFilter: "",

      dataviewValue: [],
      layout: "grid",
    };
  },
  recipesService: null,
  ingredientsService: null,
  created() {
    this.recipesService = new RecipesService();
    this.ingredientsService = new IngredientsService();
  },
  mounted() {
    this.buildRecipeList();
  },
  methods: {
    saveRecipe() {
      try {
        //change recipe name
        try {
          this.recipesService
            .editRecipeName({ name: this.newName }, this.item.recipe_id)
            .then((res) => {
              console.log("edit recipe name", res);
              this.dataviewValue.splice(0);
              this.buildRecipeList();

              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Nombre receta cambiado",
                life: 3000,
              });
            });
        } catch {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error en el cambio de nombre de la receta",
            life: 3000,
          });
        }

        //change ingredient qty

        this.item.ingredients.forEach((ingredient) => {
          try {
            this.recipesService
              .editIngredientQty(
                this.item.recipe_id,
                ingredient.ingredient_id,
                ingredient.ingredient_qty
              )
              .then((res) => {
                console.log("edit ingr. QTY", res);

                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Ingrediente modificado",
                  life: 3000,
                });
              });
          } catch {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Error en modificacion del ingrediente",
              life: 3000,
            });
          }
        });

        this.resetData();
        this.editDialog = false;
      } catch {
        this.resetData();
        this.editDialog = false;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error 456",
          life: 3000,
        });
      }
    },
    addIngredient() {
      if (this.newIngredient.id) {
        this.item.ingredients.unshift({
          ingredient_id: this.newIngredient.id,
          recipe_id: this.item.recipe_id,
          ingredient_qty: this.newIngredient.qty,
          ingrInRecipe_price: this.newIngredient.price,
          ingredient_name: this.newIngredient.name,
        });

        try {
          this.recipesService
            .addIngredient(
              this.item.recipe_id,
              this.newIngredient.id,
              this.newIngredient.qty
            )
            .then((res) => {
              console.log("add NEW  ingr", res);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Nuevo ingrediente agregado",
                life: 3000,
              });
            });
        } catch {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error en el nuevo ingrediente",
            life: 3000,
          });
        }
      }
    },
    resetData() {
      this.deleteIngredientDialog = false;
      this.deleteRecipeDialog = false;
      this.newIngredient = "";
      this.ingredient = {};
      this.newName = "";
      this.recipe = {};
      this.editDialog = false;
      this.inputFilter = "";
    },
    deleteRecipe(id) {
      try {
        this.recipesService.deleteRecipe(id).then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Receta eliminado",
            life: 3000,
          });
          let indexToDelete = this.dataviewValue.findIndex(
            (c) => c.recipe_id == id
          );
          if (indexToDelete > -1) {
            this.dataviewValue.splice(indexToDelete, 1);
          }

          this.resetData();
          this.deleteIngredientDialog = false;
        });
      } catch {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error en la eliminación del ingrediente",
          life: 3000,
        });
        this.resetData();
        this.deleteIngredientDialog = false;
      }
    },
    closeRecipeDeleteDialog() {
      this.deleteRecipeDialog = false;
      this.recipe = {};
    },
    confirmDeleteRecipe(recipe) {
      this.recipe = { ...recipe };
      this.deleteRecipeDialog = true;
    },
    deleteIngredient(recipe_id, ingredient_id) {
      try {
        this.recipesService
          .deleteIngredient(recipe_id, ingredient_id)
          .then((res) => {
            console.log(res);
            // this.recipesService.getRecipeById(recipe_id).then((res) => {
            //   console.log(res);
            //   //   this.item.ingredients.splice(0);
            //   //   this.item.ingredients = res.ingredients;
            // });

            let indexToDelete = this.item.ingredients.findIndex(
              (c) => c.ingredient_id == ingredient_id
            );
            if (indexToDelete > -1) {
              this.item.ingredients.splice(indexToDelete, 1);
            }
            this.deleteIngredientDialog = false;
            // this.resetData();
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Ingrediente eliminado",
              life: 3000,
            });
          });
      } catch {
        this.deleteIngredientDialog = false;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error en la eliminación del ingrediente",
          life: 3000,
        });
      }
    },
    confirmDeleteProduct(ingredient) {
      this.ingredient = ingredient;
      this.deleteIngredientDialog = true;
    },
    newIngredientSelected(event) {
      console.log(event);
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

    buildRecipeList() {
      this.recipesService.getRecipesWIngredients().then((data) => {
        console.log("RES RES RES ", data);
        const recipes = {};

        // Create an object in {recipes} for each recipe
        data.forEach((ingredient) => {
          if (Object.keys(recipes).length === 0) {
            recipes[ingredient.recipe_id] = {
              recipe_id: ingredient.recipe_id,
              recipe_name: ingredient.recipe_name,
              ingredients: [],
            };
            recipes[ingredient.recipe_id].ingredients.push(ingredient);
          } else if (
            Object.keys(recipes).includes(ingredient.recipe_id.toString())
          ) {
            recipes[ingredient.recipe_id].ingredients.push(ingredient);
          } else {
            recipes[ingredient.recipe_id] = {
              recipe_id: ingredient.recipe_id,
              recipe_name: ingredient.recipe_name,
              ingredients: [],
            };
            recipes[ingredient.recipe_id].ingredients.push(ingredient);
          }
        });

        // populate array [ dataviewValue ] with recipes objects
        for (let key in recipes) {
          this.dataviewValue.push(recipes[key]);
          // Calculate price for each recipe
          this.dataviewValue.forEach((recipe) => {
            recipe.price = 0;
            recipe.ingredients.forEach((ingredient) => {
              recipe.price += ingredient.ingrInRecipe_price;
            });
          });
        }
      });

      console.log("this.dataviewValue", this.dataviewValue);
    },
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    },
    editRecipe(item) {
      this.item = { ...item };
      console.log(this.item);
      this.newName = item.recipe_name;
      this.editDialog = true;
      this.ingredientsService.getAllIngredients().then((res) => {
        this.ingredientsList = res;
      });
    },
    hideDialog() {
      this.editDialog = false;
      this.resetData();
    },
  },
  computed: {
    computed_dataviewValue() {
      let array = [];

      this.dataviewValue.forEach((element) => {
        if (
          element.recipe_name
            .toLowerCase()
            .includes(this.inputFilter.toLowerCase())
          // ||
          // element.category
          //   .toLowerCase()
          //   .includes(this.inputFilter.toLowerCase()) ||
          // element.inventoryStatus
          //   .toLowerCase()
          //   .includes(this.inputFilter.toLowerCase())
        ) {
          array.push(element);
        }
      });
      return array;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
</style>
