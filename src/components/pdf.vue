<template>
  <div class="pdf-wrap">
    <van-pagination
      v-model="state.pageNum"
      :page-count="state.numPages"
      mode="simple"
    ></van-pagination>
    <div class="pdf">
      <vue-pdf-embed
        :source="state.source"
        class="vue-pdf-embed"
        :page="state.pageNum"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数
export default defineComponent({
  components: {
    VuePdfEmbed,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      source: props.src,
      pageNum: 1, // 当前页面
      scale: 1, // 缩放比例
      numPages: 0, // 总页数
    });

    onMounted(() => {
      const CMAP_URL = "cmaps/";
      const loadingTask = createLoadingTask({
        url: state.source,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
      loadingTask.promise.then((pdf: { numPages: number }) => {
        state.numPages = pdf.numPages;
      });
    });
    return {
        state
    }
  },
});
</script>

<style lang="less" scoped>
.pdf-wrap {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  .pdf {
    flex: 1;
    overflow: auto;
  }
}
</style>