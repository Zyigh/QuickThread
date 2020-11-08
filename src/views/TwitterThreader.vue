<template>
  <div class="container-fluid">
    <div class="row">
      <b-alert
        class="mt-4 col-md-6 offset-md-3 position-fixed z-index"
        :show="timeBeforeClosingAlert"
        :dismissible="true"
        :fade="true"
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        <p class="p-0 m-0">
          Your content has been saved successfuly ! It will be available next time you come here.
        </p>
      </b-alert>
    </div>
    <div class="row">
      <div class="col-md-6">
        <TweetEditor @contentSaved="showSuccessAlert"/>
      </div>
      <div class="col-md-6">
        <TweetsPreview v-if="hasElements"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .z-index {
    z-index: 8;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import TweetEditor from '../components/TweetEditor.vue';
import TweetsPreview from '../components/TweetsPreview.vue';

export default Vue.extend({
  name: 'TwitterThreader',
  components: {
    TweetEditor,
    TweetsPreview,
  },
  data() {
    return {
      timeBeforeClosingAlert: 0 as number,
    };
  },
  computed: {
    ...mapGetters([
      'tweetsFormatted',
    ]),
    hasElements(): boolean {
      return 0 < this.tweetsFormatted.length;
    },
  },
  methods: {
    showSuccessAlert() {
      this.timeBeforeClosingAlert = 5;
    },
    countDownChanged(dismissCountDown: number) {
      this.timeBeforeClosingAlert = dismissCountDown;
    },
  },
});
</script>
