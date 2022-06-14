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
                  align-items-center
                  p-3
                  w-full
                "
              >
                <div>
                  <span
                    class="
                      text-2xl
                      font-semibold
                      mb-2
                      mx-6
                      align-self-center
                      md:align-self-end
                    "
                  >
                    $
                    {{ slotProps.data.price.toFixed(2) }}</span
                  >
                </div>
                <!-- <img
                  :src="'images/product/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                /> -->
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.name_recipe }}
                  </div>
                  <div>
                    <Chip
                      class="mr-2 mt-3"
                      v-for="item in slotProps.data.ingredients"
                      :key="item.ID_ingredient"
                      :label="item.NAME_ingredient"
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
                    icon="pi pi-fw pi-trash"
                    label="Delete "
                    class="mb-2 p-button-danger"
                  ></Button>
                  <Button
                    @click="editRecipe"
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
            <div class="col-12 md:col-6 xl:col-3">
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
                    {{ slotProps.data.name_recipe }}
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
                              {{ slotProps.data.NAME_ingredient }}
                            </template>
                          </Column>
                          <Column field="qty" header="Cantidad">
                            <template #body="slotProps">
                              {{ slotProps.data.QTY_ingredient }}
                            </template></Column
                          >
                          <Column field="price" header="Precio">
                            <template #body="slotProps">
                              {{ slotProps.data.price_ingredient.toFixed(2) }}
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
                    @click="deleteRecipe(slotProps.data[0].id_recipe)"
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
        <InputText :placeholder="item.name_recipe"></InputText>

        <h5>Ingredientes</h5>
        <div class="my-3">
          <h6>Agrega un ingrediente</h6>
          <div class="grid">
            <div class="col-8">
              <AutoComplete
                v-model="newIngredient"
                :suggestions="filteredIngredients"
                @complete="newIngredientSelected($event)"
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
          :key="ingredient.ID_ingredient"
          class="grid px-3"
        >
          <div class="col-4 flex justify-content-start align-items-center">
            {{ ingredient.NAME_ingredient }}
          </div>
          <div class="col-4 flex justify-content-center align-items-center">
            <InputNumber
              v-model="ingredient.QTY_ingredient"
              :placeholder="ingredient.QTY_ingredient"
            ></InputNumber>
          </div>
          <div class="col-4 flex justify-content-center align-items-center">
            <div class="flex justify-content-end">
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
          @click="saveProduct"
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
          >Quieres eliminar <b>{{ ingredient.NAME_ingredient }}</b
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
          @click="deleteIngredient(item.id_recipe, ingredient.ID_ingredient)"
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

      newIngredient: "",
      ingredientsList: [],
      filteredIngredients: [],

      ingredient: {},

      item: [],
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
    deleteIngredient(id_recipe, ID_ingredient) {
      try {
        this.recipesService
          .deleteIngredient(id_recipe, ID_ingredient)
          .then((res) => {
            console.log(res);
            this.recipesService.getRecipeById(id_recipe).then((res) => {
              this.item.ingredients.splice(0);
              this.item.ingredients = res.ingredients;
            });
            this.deleteIngredientDialog = false;
            this.ingredient = {};
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Ingrediente eliminado",
              life: 3000,
            });
          });
      } catch {
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
    saveProduct() {},
    buildRecipeList() {
      this.recipesService.getRecipesWIngredients().then((data) => {
        const recipes = {};

        // Create an object in {recipes} for each recipe
        data.forEach((ingredient) => {
          if (Object.keys(recipes).length === 0) {
            recipes[ingredient.ID_recipe] = {
              id_recipe: ingredient.ID_recipe,
              name_recipe: ingredient.NAME_recipe,
              ingredients: [],
            };
            recipes[ingredient.ID_recipe].ingredients.push(ingredient);
          } else if (
            Object.keys(recipes).includes(ingredient.ID_recipe.toString())
          ) {
            recipes[ingredient.ID_recipe].ingredients.push(ingredient);
          } else {
            recipes[ingredient.ID_recipe] = {
              id_recipe: ingredient.ID_recipe,
              name_recipe: ingredient.NAME_recipe,
              ingredients: [],
            };
            recipes[ingredient.ID_recipe].ingredients.push(ingredient);
          }
        });

        // populate array [ dataviewValue ] with recipes objects
        for (let key in recipes) {
          this.dataviewValue.push(recipes[key]);
          // Calculate price for each recipe
          this.dataviewValue.forEach((recipe) => {
            recipe.price = 0;
            recipe.ingredients.forEach((ingredient) => {
              recipe.price += ingredient.price_ingredient;
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
      this.editDialog = true;
      this.ingredientsService.getAllIngredients().then((res) => {
        this.ingredientsList = res;
      });
    },
    hideDialog() {
      this.editDialog = false;
    },
  },
  computed: {
    computed_dataviewValue() {
      let array = [];

      this.dataviewValue.forEach((element) => {
        if (
          element.name_recipe
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
