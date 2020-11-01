<template>
  <div class="border bg-white rounded">
    <div class="text-center p-2">
      <h2>Éditeur</h2>
    </div>
    <div class="form-group p-2">
      <label for="tweet-content">Tweets :</label>
      <b-form-textarea
        id="tweet-content"
        rows="8"
        max-rows="42"
        v-model="tweetsContent"
        no-resize
      />
    </div>
    <div class="form-group py-2 d-flex align-items-center justify-content-center">
      <b-button variant="primary" @click="preview">Preview</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'TweetEditor',
    data() {
        return {
            tweetsContent: '',
        };
    },
    methods: {
        preview() {
            this.$store.dispatch('setTweetsContent', this.tweetsContent);
        },
    },
});
</script>
