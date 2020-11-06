<template>
  <div class="border bg-white rounded">
    <div class="text-center p-2">
      <h2>Editor</h2>
    </div>
    <div class="form-group p-2">
      <label for="tweet-content">Tweets :</label>
      <b-form-textarea
        id="tweet-content"
        rows="8"
        max-rows="42"
        v-model="rawContent"
        no-resize
        @input="preview"
      />
    </div>
    <div class="form-group py-2 d-flex align-items-center justify-content-around">
      <b-button
        :variant="contentIsSameAsStore ? 'secondary' : 'primary'"
        @click="saveContent"
        :disabled="contentIsSameAsStore"
      >
        Save content
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TweetEditor',
  data() {
    return {
      rawContent: this.$store.getters.rawContent,
    };
  },
  computed: {
    contentIsSameAsStore(): boolean {
      return this.$store.getters.rawContent === this.rawContent;
    },
  },
  methods: {
    async preview() {
      this.$store.dispatch('setTweetsContent', this.rawContent);
    },
    async saveContent() {
      await this.$store.dispatch('setRawContent', this.rawContent);
      this.$emit('contentSaved');
    },
  },
  mounted() {
    if ('' !== this.rawContent) {
      this.$store.dispatch('setTweetsContent', this.rawContent);
    }
  },
});
</script>
