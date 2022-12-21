<template>
  <section class="section">
    <div class="container" style="max-width: 400px">
      <h1 class="title">Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <input type="file" ref="preview" @change="uploadFile" multiple />
      <transition-group name="files-list" tag="div">
        <template v-if="imgFiles.length > 0">
          <div
            v-for="file in fileDisp"
            :key="file.id"
            draggable="true"
            @dragstart="dragstart(file, $event)"
            @dragenter="dragenter(file)"
            @dragover.stop.prevent="dragover"
            @dragend.stop.prevent="dragend"
            style="position: relative"
          >
            <ImgDisplay :file="file" @deleteFile="deleteFile" />
          </div>
        </template>
      </transition-group>
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
      draggingItem: null, // ドラッグ中の要素を保持するための変数
    };
  },
  mounted() {},
  methods: {
    uploadFile() {
      const FILES = this.$refs.preview.files;
      console.log(this.imgFiles);
      Object.keys(FILES).forEach((file) => {
        FILES[file].id = this.imgId++;
        FILES[file].order = this.imgOrder++;
        this.imgFiles.push(FILES[file]);
      });

      console.log(this.imgFiles);
      this.$refs.preview.value = "";
    },
    deleteFile(fileId) {
      console.log(fileId);
      this.imgFiles = this.imgFiles.filter((file) => {
        return file.id != fileId;
      });
      console.log(this.imgFiles);
    },
    dragstart(item, e) {
      this.draggingItem = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = "move"; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
      console.log("this.draggingItem:" + this.draggingItem.order);
    },
    dragenter(item) {
      console.log("this.draggingItem.order:" + this.draggingItem.order);
      console.log("item.order:" + item.order);
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.order, this.draggingItem.order] = [
        this.draggingItem.order,
        item.order,
      ];
    },
    dragover(e) {
      e.dataTransfer.dropEffect = "move"; // 移動モードに設定
    },
    dragend(e) {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      this.draggingItem = null; // ドラッグ中の要素をクリア
      this.imgFiles = this.imgFiles.slice().sort((a, b) => a.order - b.order);
    },
  },
  computed: {
    fileDisp() {
      return this.imgFiles.slice().sort((a, b) => a.order - b.order);
    },
  },
};
</script>
<style scoped>
.files-list-move {
  transition: transform 0.3s;
}
</style>
