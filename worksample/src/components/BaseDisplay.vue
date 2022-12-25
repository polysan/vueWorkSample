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
    <!-- <transition-group name="files-list" tag="div" style="margin: 10px"> -->
    <draggable
      v-model="imgFiles"
      item-key="id"
      tag="ul"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element, index }">
        <li>
          <img :src="element.url" alt="ここにプレビューが表示されます" />
          <p>{{ element.name }}</p>
          <p>{{ index }}</p>
        </li>
      </template>
    </draggable>
    <!-- </transition-group> -->
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
      imgFiles: [
        {
          id: 0,
          order: 1,
          url: "https://m.media-amazon.com/images/I/51CMd7VvQ3L._AC_SY450_.jpg",
          name: "マウス",
        },
        {
          id: 1,
          order: 0,
          url: "https://m.media-amazon.com/images/I/6160VVxyCcL._SX218_BO1,204,203,200_QL40_ML2_.jpg",
          name: "本",
        },
        {
          id: 2,
          order: 2,
          url: "https://m.media-amazon.com/images/I/416bRWgWanL._SY445_SX342_QL70_ML2_.jpg",
          name: "手袋",
        },
      ],
      submitFiles: [],
      imgId: 0,
      imgOrder: 0,
    };
  },
  mounted() {
    this.imgFiles = this.imgFiles.slice().sort((a, b) => a.order - b.order);
  },
  methods: {
    // onStart(element) {
    //   console.log("start");
    //   console.log(element);
    // },
    onEnd(element) {
      console.log("end");
      console.log(element);
      console.log(this.imgFiles);
      console.log();
    },
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
  },
};
</script>
<style scoped>
.files-list-move {
  transition: transform 0.3s;
}
ul {
  list-style-type: none;
}
li {
  cursor: pointer;
  padding: 10px;
  /* border: solid #ddd 1px; */
}
</style>
