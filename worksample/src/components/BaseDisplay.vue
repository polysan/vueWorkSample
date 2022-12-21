<template>
  <section class="section">
    <div class="container">
      <p class="subtitle">
        <strong>ドラッグ＆ドロップで<br />順序を入れ替えてください</strong>
      </p>
      <input type="file" ref="preview" @change="uploadFile" multiple />
      <button
        class="button is-primary is-medium"
        @click="save"
        :disabled="imgFiles.length < 1"
      >
        保存
      </button>
      <transition-group
        name="files-list"
        tag="div"
        style="margin: 10px; display: flex; flex-wrap: wrap"
      >
        <template v-if="imgFiles.length > 0">
          <div
            v-for="file in fileDisp"
            :key="file.id"
            draggable="true"
            @dragstart="dragstart(file, $event)"
            @dragenter="dragenter(file)"
            @dragover.stop.prevent="dragover"
            @dragend.stop.prevent="dragend"
            style="position: relative; margin: 10px"
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
const url = "https://httpbin.org/post";

export default {
  components: { ImgDisplay },
  data() {
    return {
      imgFiles: [],
      submitFiles: [],
      imgId: 0,
      imgOrder: 0,
      draggingItem: null,
    };
  },
  mounted() {},
  methods: {
    uploadFile() {
      const FILES = this.$refs.preview.files;
      Object.keys(FILES).forEach((file) => {
        FILES[file].id = this.imgId++;
        FILES[file].order = this.imgOrder++;
        FILES[file].url = URL.createObjectURL(FILES[file]);
        this.imgFiles.push(FILES[file]);
      });
      this.$refs.preview.value = "";
    },

    save() {
      let result = window.confirm("画像を保存しますか？");
      if (!result) {
        return;
      }
      this.submitFiles = [];
      this.filesConvertSubmit();
      console.log(this.submitFiles);
      fetch(url, {
        method: "POST",
        body: this.submitFiles,
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error!");
          }
          console.log("ok!");
          alert("保存しました");
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filesConvertSubmit() {
      let submitFile = {};
      this.imgFiles.forEach((file) => {
        submitFile.id = file.id;
        submitFile.order = file.order;
        submitFile.url = file.url;
        submitFile.name = file.name;
        this.submitFiles.push(submitFile);
        submitFile = {};
      });
    },

    deleteFile(fileId) {
      let result = window.confirm("削除しますか？");
      if (!result) {
        return;
      }
      this.imgFiles = this.imgFiles.filter((file) => {
        return file.id != fileId;
      });
    },

    ///////////// ドラッグ＆ドロップメソッド/////////////////
    dragstart(item, e) {
      this.draggingItem = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = "move"; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
    },
    dragenter(item) {
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
    ///////////// ドラッグ＆ドロップメソッド/////////////////
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
