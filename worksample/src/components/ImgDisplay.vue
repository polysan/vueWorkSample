<template>
  <div @click="deletePreview" class="delete">X</div>
  <img :src="file.url" alt="ここにプレビューが表示されます" />
  <p>{{ file.name }}</p>
</template>
<script>
export default {
  props: ["file"],
  emits: ["deleteFile"],
  methods: {
    deletePreview() {
      this.$emit("deleteFile", this.file.id);
      // 作成したURLを開放するためにrevokeObjectURLを実行
      URL.revokeObjectURL(this.file);
    },
  },
};
</script>

<style>
.delete {
  cursor: pointer;
  position: absolute;
}
</style>
