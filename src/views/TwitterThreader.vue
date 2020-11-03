<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-md-6">
      <TweetEditor />
    </div>
    <div class="col-md-6">
      <TweetsPreview v-if="hasElements" />
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TweetEditor from '../components/TweetEditor.vue';
import TweetsPreview from '../components/TweetsPreview.vue';

export default Vue.extend({
    name: 'TwitterThreader',
    components: {
        TweetEditor,
        TweetsPreview,
    },
    computed: {
        tweetsFormatted(): string[] {
            return this.$store.getters.tweetsFormatted;
        },
        hasElements(): boolean {
            return 0 < this.tweetsFormatted.length;
        },
    },
});
</script>
