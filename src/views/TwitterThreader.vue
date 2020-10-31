<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-md-6">
      <TweetEditor />
    </div>
    <div class="col-md-6">
      <TweetsPreview />
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
});
</script>

<style scoped>

</style>