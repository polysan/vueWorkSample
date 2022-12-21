<template>
  <div @click="deletePreview" style="position: absolute">X</div>
  <img :src="createFileUrl" alt="ここにプレビューが表示されます" />
  <p>{{ "name:" + file.name }}</p>
  <p>{{ "id:" + file.id }}</p>
  <p>{{ "order:" + file.order }}</p>
</template>
<script>
export default {
  props: ["file"],
  methods: {
    deletePreview() {
      // 作成したURLを開放するためにrevokeObjectURLを実行
      URL.revokeObjectURL(this.file);
    },
  },
  computed: {
    createFileUrl: function () {
      return URL.createObjectURL(this.file);
    },
  },
};
</script>

<style></style>
