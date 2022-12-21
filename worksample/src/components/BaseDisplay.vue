<template>
  <div class="p-3">
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
      <draggable v-model="imgFiles" item-key="no" tag="ul">
        <template #item="{ element }">
          <img :src="element" alt="ここにプレビューが表示されます" />
          <p>{{ element.name }}</p>
        </template>
      </draggable>
    </transition-group>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const url = "https://httpbin.org/post";
export default {
  components: {
    draggable: draggable,
  },
  data() {
    return {
      items: [
        { no: 1, name: "キャベツ", categoryNo: "1" },
        { no: 2, name: "ステーキ", categoryNo: "2" },
        { no: 3, name: "リンゴ", categoryNo: "3" },
      ],
      imgFiles: [
        { no: 1, name: "キャベツ", categoryNo: "1" },
        { no: 2, name: "ステーキ", categoryNo: "2" },
        { no: 3, name: "リンゴ", categoryNo: "3" },
      ],
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
  },
};
</script>
<style scoped>
.files-list-move {
  transition: transform 0.3s;
}
</style>
