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
    <draggable
      v-model="imgFiles"
      item-key="id"
      tag="div"
      :options="{ handle: '.img' }"
    >
      <template #item="{ element, index }">
        <div>
          <img
            :src="element.url"
            class="img"
            alt="ここにプレビューが表示されます"
          />
          <p>{{ element.name }}</p>
          <p>{{ index }}</p>
        </div>
      </template>
    </draggable>
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
      imgFiles: [],
      submitFiles: [],
      imgId: 0,
      imgOrder: 0,
    };
  },
  mounted() {
    this.imgFiles = this.imgFiles.slice().sort((a, b) => a.order - b.order);
  },
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
      console.log(this.imgFiles);
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
      let order = 0;
      this.imgFiles.forEach((file) => {
        submitFile.id = file.id;
        submitFile.order = order++;
        submitFile.url = file.url;
        submitFile.name = file.name;
        this.submitFiles.push(submitFile);
        submitFile = {};
      });
    },
  },
};
</script>
<style scoped>
.files-list-move {
  transition: transform 0.3s;
}
.img {
  cursor: pointer;
}
ul {
  list-style-type: none;
}
li {
  cursor: pointer;
  padding: 10px;
}
</style>
