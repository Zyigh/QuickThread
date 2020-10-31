<template>
  <div class="border bg-white rounded">
    <div class="text-center p-2">
      <h2>Preview</h2>
    </div>
    <div class="p-2">
      <div class="my-2" v-for="tweet in tweetsFormatted">
        <b-card bg-variant="light">
          <p v-html="tweet" />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'TweetsPreview',
    computed: {
        tweetsFormatted(): string[] {
            return this.$store.getters.tweetsFormatted.map((tweet: string) => tweet.replace(/\n/g, '<br />'));
        },
    },
});
</script>

<style scoped>

</style>