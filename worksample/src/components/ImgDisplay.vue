<template>
  <div @click="deletePreview" class="delete">X</div>
  <img :src="file.url" alt="ここにプレビューが表示されます" />
  <p>{{ "name:" + file.name }}</p>
  <p>{{ "id:" + file.id }}</p>
  <p>{{ "order:" + file.order }}</p>
  <p>{{ "url:" + file.url }}</p>
</template>
<script>
export default {
  props: ["file"],
  emits: ["deleteFile"],
  methods: {
    deletePreview() {
      console.log("deletePreview");
      console.log(this.file.id);
      this.$emit("deleteFile", this.file.id);
      // 作成したURLを開放するためにrevokeObjectURLを実行
      URL.revokeObjectURL(this.file);
    },
  },
  // computed: {
  //   createFileUrl: function () {
  //     return URL.createObjectURL(this.file);
  //   },
  // },
};
</script>

<style>
.delete {
  cursor: pointer;
  position: absolute;
}
</style>
