<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <input type="file" ref="preview" @change="uploadFile" multiple />
      <template v-if="imgFiles.length > 0">
        <div v-for="file in imgFiles" :key="file">
          <ImgDisplay :file="file" />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import ImgDisplay from "./ImgDisplay";
export default {
  components: { ImgDisplay },
  data() {
    return {
      message: "Try Preview!",
      imgFiles: [],
      imgId: 0,
      imgOrder: 0,
    };
  },
  mounted() {},
  methods: {
    uploadFile() {
      const FILES = this.$refs.preview.files;

      Object.keys(FILES).forEach((file) => {
        FILES[file].id = this.imgId++;
        FILES[file].order = this.imgOrder++;
        this.imgFiles.push(FILES[file]);
      });

      console.log(this.imgFiles);
      this.$refs.preview.value = "";
    },
  },
};
</script>
