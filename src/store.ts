import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const rawContentKey = 'rawContent';

export default new Vuex.Store({
  state: {
    rawContent: localStorage.getItem(rawContentKey) || '',
    tweetsFormatted: Array<string>(),
  },
  mutations: {
    SET_TWEETS_FORMATTED(state, tweetsFormatted: string[]) {
      state.tweetsFormatted = tweetsFormatted;
    },
    SET_RAW_CONTENT(state, rawContent: string) {
      state.rawContent = rawContent;
    },
  },
  actions: {
    setTweetsContent({commit}, tweetsContent: string) {
      let tweetsFormatted = Array<string>();
      const trimedContent = tweetsContent.trim();

      if (trimedContent.length > 0) {
        if (trimedContent.length <= 280) {
          tweetsFormatted.push(trimedContent);
        } else {
          const nbrOfTweets: number = Math.ceil(trimedContent.length / 280);
          let tweetsCountEstimateLength: number = `\n${nbrOfTweets}/${nbrOfTweets}`.length;

          if (9 === nbrOfTweets && 0 === trimedContent.length % 280) {
            tweetsCountEstimateLength += 2;
          }

          const regex = new RegExp(`.{1,${280 - tweetsCountEstimateLength}}( |.$)`, 'gms');
          const tweets: string[] = trimedContent.match(regex) || Array<string>();

          tweetsFormatted = tweets.map((tweet: string, index: number): string => {
            if (nbrOfTweets === 1) {
              return tweet;
            }

            return `${tweet}\n${index + 1}/${tweets.length}`;
          });
        }
      }

      commit('SET_TWEETS_FORMATTED', tweetsFormatted);
    },
    setRawContent({commit}, rawContent: string) {
      localStorage.setItem(rawContentKey, rawContent);
      commit('SET_RAW_CONTENT', rawContent);
    },
  },
  getters: {
    rawContent(state): string {
      return state.rawContent;
    },
    tweetsFormatted(state): string[] {
      return state.tweetsFormatted;
    },
  },
});
