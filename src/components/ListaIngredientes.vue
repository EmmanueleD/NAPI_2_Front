<template>
  <div>
    <div class="card">
      <Toast />
      <div class="mb-4">
        <h5 class="mb-2 md:m-0 p-as-md-center">Lista ingredientes</h5>
      </div>

      <DataTable
        ref="dt"
        :value="products"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="stack"
      >
        <template #header>
          <div
            class="
              table-header
              flex flex-column
              md:flex-row md:justiify-content-between
            "
          >
            <div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
            <Button
              label="Exportar"
              icon="pi pi-upload"
              class="mx-3 p-button-help"
              @click="exportCSV($event)"
            />
          </div>
        </template>

        <Column
          field="id"
          header="ID"
          :sortable="true"
          style="min-width: 12rem"
        ></Column>
        <Column
          field="name"
          header="Ingrediente"
          :sortable="true"
          style="min-width: 16rem"
        ></Column>

        <Column
          field="price"
          header="Precio"
          :sortable="true"
          style="min-width: 8rem"
        >
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>

        <Column
          field="qty"
          header="Cantidad"
          :sortable="true"
          style="min-width: 8rem"
        >
          <template #body="slotProps">
            {{ slotProps.data.qty }}
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <div class="flex justify-content-end">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-info mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
      position="right"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="product.name"
          required="true"
          :class="{ 'p-invalid': submitted && !product.name }"
        />
        <small class="p-error" v-if="submitted && !product.name"
          >Name is required.</small
        >
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <InputNumber
            id="price"
            v-model="product.price"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
          <small class="p-error" v-if="submitted && !product.price"
            >Insertar el precio</small
          >
        </div>
        <div class="field col">
          <label for="quantity">Cantidad</label>
          <InputNumber id="quantity" v-model="product.qty" integeronly />
          <small class="p-error" v-if="submitted && !product.qty"
            >Insertar la cantidad</small
          >
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
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      position="right"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Quieres eliminar <b>{{ product.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteProduct"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import IngredientsService from "../service/IngredientsService";

export default {
  data() {
    return {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
    };
  },
  ingredientsService: null,
  created() {
    this.ingredientsService = new IngredientsService();
    this.initFilters();
  },
  mounted() {
    this.getAllIngredients();
  },
  methods: {
    getAllIngredients() {
      this.ingredientsService
        .getAllIngredients()
        .then((data) => (this.products = data));
    },
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    },

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
        if (this.product.id) {
          try {
            this.ingredientsService
              .editIngredient(this.product, this.product.id)
              .then(() => {
                this.getAllIngredients();
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Ingrediente modificado ",
                  life: 3000,
                });
              });
          } catch {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Error in edit ingredient",
              life: 3000,
            });
          }
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error in edit ingredient",
            life: 3000,
          });
        }

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = { ...product };
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      try {
        this.ingredientsService.deleteIngredient(this.product.id).then(() => {
          this.deleteProductDialog = false;
          this.product = {};
          this.getAllIngredients();
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

    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>