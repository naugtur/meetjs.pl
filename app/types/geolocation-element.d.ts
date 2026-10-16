// The experimental <geolocation> element (Chrome) used by NearestCity.vue.
// Vue treats it as a native element (vue.compilerOptions.isCustomElement).
declare global {
  interface HTMLGeolocationElement extends HTMLElement {
    readonly position: GeolocationPosition | null;
    readonly error: GeolocationPositionError | null;
  }
}

export {};
