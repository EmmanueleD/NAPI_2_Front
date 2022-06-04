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
          :sortOrder="sortOrder"
          :sortField="sortField"
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
                    >${{ slotProps.data.price }}</span
                  >
                </div>
                <!-- <img
                  :src="'images/product/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                /> -->
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">
                    {{ slotProps.data.name }}
                  </div>
                  <div>
                    <Chip
                      class="mr-2 mt-3"
                      v-for="item in ingredientes"
                      :key="item.ingrediente"
                      :label="item.ingrediente"
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
            <div class="col-12 md:col-4">
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
                  <span class="text-2xl font-semibold"
                    >${{ slotProps.data.price }}</span
                  >
                </div>
                <div class="text-center">
                  <!-- <img
                    :src="'images/product/' + slotProps.data.image"
                    :alt="slotProps.data.name"
                    class="w-9 shadow-2 my-3 mx-0"
                  /> -->
                  <div class="text-2xl font-bold">
                    {{ slotProps.data.name }}
                  </div>
                  <div class="my-3">
                    <h5>Lista de ingredientes</h5>
                    <DataTable :value="ingredientes">
                      <Column field="ingrediente" header="Ingrediente"></Column>
                      <Column field="cantidad" header="Cantidad"></Column>
                      <Column field="precio" header="Precio"></Column>
                    </DataTable>
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
      :style="{ width: '70vw' }"
      :header="item.name"
      :modal="true"
      class="p-fluid"
    >
      <h5>Nobre Receta</h5>
      <InputText :value="item.name"></InputText>

      <h5>Ingredientes</h5>

      AGGIUNGI Ingrediente ELIMINA Ingrediente <br />
      MODIFICA QUANTITA Ingrediente <br />
      MODIFICA NOME RICETTA

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
  </div>
</template>

<script>
import ProductService from "../service/ProductService";

export default {
  data() {
    return {
      item: {},
      editDialog: false,
      ingredientes: [
        {
          ingrediente: "Pan",
          cantidad: 20,
          precio: 33,
        },
        {
          ingrediente: "Manteca",
          cantidad: 2,
          precio: 3,
        },
        {
          ingrediente: "Dulce de leche",
          cantidad: 203,
          precio: 333,
        },
      ],
      inputFilter: "",
      picklistValue: [
        [
          { name: "San Francisco", code: "SF" },
          { name: "London", code: "LDN" },
          { name: "Paris", code: "PRS" },
          { name: "Istanbul", code: "IST" },
          { name: "Berlin", code: "BRL" },
          { name: "Barcelona", code: "BRC" },
          { name: "Rome", code: "RM" },
        ],
        [],
      ],
      orderlistValue: [
        { name: "San Francisco", code: "SF" },
        { name: "London", code: "LDN" },
        { name: "Paris", code: "PRS" },
        { name: "Istanbul", code: "IST" },
        { name: "Berlin", code: "BRL" },
        { name: "Barcelona", code: "BRC" },
        { name: "Rome", code: "RM" },
      ],
      dataviewValue: [],
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
    };
  },
  productService: null,
  created() {
    this.productService = new ProductService();
    this.productService
      .getProducts()
      .then((data) => (this.dataviewValue = data));
  },
  mounted() {},
  methods: {
    editRecipe(item) {
      this.item = { ...item };
      this.editDialog = true;
    },
    hideDialog() {
      this.editDialog = false;
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
  },
  computed: {
    computed_dataviewValue() {
      let array = [];

      this.dataviewValue.forEach((element) => {
        if (
          element.name.toLowerCase().includes(this.inputFilter.toLowerCase()) ||
          element.category
            .toLowerCase()
            .includes(this.inputFilter.toLowerCase()) ||
          element.inventoryStatus
            .toLowerCase()
            .includes(this.inputFilter.toLowerCase())
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
