<template>
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
      :to="'/article/' + articleInfo.art_id"
    />

    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
      :to="'/article/' + articleInfo.art_id"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :to="'/article/' + articleInfo.art_id"
    >
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span> {{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'articleItem',
  props: {
    articleInfo: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      //   articleDesc: `$`
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const timer = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count} ${timer}`
    }
  }
}
</script>

<style></style>
