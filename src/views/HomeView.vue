<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import BasicScene from "@/Babylon/BasicScene";

export default Vue.extend({
  name: "HomeView",
  mounted() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      new BasicScene(canvas);
    }
  },
});
</script>
<style scope>
canvas {
  width: 100%;
  height: 100vh;
}
</style>
