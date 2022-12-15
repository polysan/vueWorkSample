/* eslint-disable */
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <input type="file" ref="preview" @change="uploadFile" multiple />
      <template v-if="urls.length > 0">
        <div v-for="url in urls" :key="url" style="position: relative">
          <div style="position: absolute" @click="deletePreview">X</div>
          <img :src="url" alt="ここにプレビューが表示されます" />
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: "Try Preview!",
      urls: [],
    };
  },
  mounted() {
    console.log(this.$refs.preview);
  },
  methods: {
    uploadFile() {
      const FILES = this.$refs.preview.files;
      const ADDFILES = Object.keys(FILES).map((element) =>
        URL.createObjectURL(FILES[element])
      );
      this.urls = this.urls.concat(ADDFILES);
      this.$refs.preview.value = "";
    },
    deletePreview() {
      this.urls = [];
      URL.revokeObjectURL(this.url);
    },
  },
};
</script>
