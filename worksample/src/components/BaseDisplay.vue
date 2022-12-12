/* eslint-disable */
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <input type="file" ref="preview" @change="uploadFile" />
      <div v-if="url" style="position: relative">
        <div style="position: absolute" @click="deletePreview">X</div>
        <img :src="url" alt="ここにプレビューが表示されます" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: "Try Preview!",
      url: "",
    };
  },
  mounted() {
    console.log(this.$refs.preview);
  },
  methods: {
    uploadFile() {
      const file = this.$refs.preview.files[0];
      this.url = URL.createObjectURL(file);
      this.$refs.preview.value = "";
    },
    deletePreview() {
      this.url = "";
      URL.revokeObjectURL(this.url);
    },
  },
};
</script>
