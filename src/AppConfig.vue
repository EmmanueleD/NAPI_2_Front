<template>
  <div id="layout-config" :class="containerClass">
    <a
      href="#"
      class="layout-config-button"
      id="layout-config-button"
      @click="toggleConfigurator"
    >
      <i class="pi pi-cog"></i>
    </a>
    <Button
      class="p-button-danger layout-config-close p-button-rounded p-button-text"
      icon="pi pi-times"
      @click="hideConfigurator"
      :style="{ 'z-index': 1 }"
    ></Button>

    <div class="layout-config-content">
      <h5 class="mt-0">Tamaño</h5>
      <div class="config-scale">
        <Button
          icon="pi pi-minus"
          @click="decrementScale()"
          class="p-button-text"
          :disabled="scale === scales[0]"
        />
        <i
          class="pi pi-circle-on"
          v-for="s of scales"
          :class="{ 'scale-active': s === scale }"
          :key="s"
        />
        <Button
          icon="pi pi-plus"
          @click="incrementScale()"
          class="p-button-text"
          :disabled="scale === scales[scales.length - 1]"
        />
      </div>

      <h5>Tema</h5>

      <h6>Claro - Oscuro</h6>
      <div class="grid free-themes">
        <div class="col-3 text-center">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-light-indigo', false)"
          >
            <img
              class="block"
              src="images/themes/lara-light-indigo.png"
              alt="Lara Light Indigo"
            />
          </button>
        </div>

        <div class="col-3 text-center">
          <button
            class="p-link"
            type="button"
            @click="changeTheme($event, 'lara-dark-indigo', true)"
          >
            <img
              class="block"
              src="images/themes/lara-dark-indigo.png"
              alt="Lara Dark Indigo"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "./AppEventBus";

export default {
  props: {
    layoutMode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: false,
      d_layoutMode: this.layoutMode,
      scale: 14,
      scales: [12, 13, 14, 15, 16],
    };
  },
  outsideClickListener: null,
  themeChangeListener: null,
  watch: {
    $route() {
      if (this.active) {
        this.active = false;
        this.unbindOutsideClickListener();
      }
    },
    layoutMode(newValue) {
      this.d_layoutMode = newValue;
    },
  },
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener);
  },
  mounted() {
    this.themeChangeListener = () => {
      this.applyScale();
    };

    EventBus.on("theme-change", this.themeChangeListener);
  },
  methods: {
    toggleConfigurator(event) {
      this.active = !this.active;
      event.preventDefault();

      if (this.active) this.bindOutsideClickListener();
      else this.unbindOutsideClickListener();
    },
    hideConfigurator(event) {
      this.active = false;
      this.unbindOutsideClickListener();
      event.preventDefault();
    },
    changeInputStyle(value) {
      this.$primevue.config.inputStyle = value;
    },
    changeRipple(value) {
      this.$primevue.config.ripple = value;
    },
    changeLayout(event, layoutMode) {
      this.$emit("layout-change", layoutMode);
      event.preventDefault();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.active && this.isOutsideClicked(event)) {
            this.active = false;
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(
        this.$el.isSameNode(event.target) || this.$el.contains(event.target)
      );
    },
    decrementScale() {
      this.scale--;
      this.applyScale();
    },
    incrementScale() {
      this.scale++;
      this.applyScale();
    },
    applyScale() {
      document.documentElement.style.fontSize = this.scale + "px";
    },
    changeTheme(event, theme, dark) {
      EventBus.emit("theme-change", { theme: theme, dark: dark });
      event.preventDefault();
    },
  },
  computed: {
    containerClass() {
      return ["layout-config", { "layout-config-active": this.active }];
    },
    rippleActive() {
      return this.$primevue.config.ripple;
    },
    inputStyle() {
      return this.$appState.inputStyle;
    },
  },
};
</script>
