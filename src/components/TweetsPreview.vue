<template>
  <div class="border bg-white rounded">
    <div class="text-center p-2">
      <h2>Preview</h2>
    </div>
    <div class="p-2">
      <div class="my-2" v-for="tweet in tweetsFormatted">
        <b-card bg-variant="light">
          <p v-html="setupBlankSpacesForHtml(tweet)"/>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'TweetsPreview',
  computed: {
    ...mapGetters([
      'tweetsFormatted',
    ]),
  },
  methods: {
    setupBlankSpacesForHtml(tweet: string): string {
      return tweet.replace(/\n/g, '<br />');
    },
  },
});
</script>
