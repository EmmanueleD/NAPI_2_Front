<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />

        <h2>Nuevo ingrediente</h2>
        <div class="grid col-fixed" style="max-width: 600px">
          <h5>Nombre</h5>

          <div class="p-inputgroup">
            <InputText type="text" v-model="newIngredient.name" id="name" />
          </div>

          <h5>Precio</h5>

          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">$</span>
            <InputText type="number" v-model="newIngredient.price" id="price" />
          </div>

          <h5>Cantidad</h5>

          <div class="p-inputgroup">
            <InputText type="number" v-model="newIngredient.qty" id="qty" />
          </div>

          <Button
            icon="pi pi-plus"
            label="Save"
            class="p-button-rounded p-button-success mt-6"
            @click="addIngredient"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsService from "../service/IngredientsService";

export default {
  name: "NuevoIngrediente",
  data() {
    return {
      newIngredient: {
        name: "",
        price: 0,
        qty: 0,
      },
    };
  },
  ingredientsService: null,
  created() {
    this.ingredientsService = new IngredientsService();
  },
  methods: {
    resetData() {
      this.newIngredient = {
        name: "",
        price: 0,
        qty: 0,
      };
    },
    addIngredient() {
      try {
        this.ingredientsService.newIngredient(this.newIngredient).then(() => {
          this.resetData();
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Nuevo ingrediente guardado ",
            life: 3000,
          });
        });
      } catch {
        this.resetData();
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error con el nuevo ingrediente",
          life: 3000,
        });
      }
    },
  },
};
</script>