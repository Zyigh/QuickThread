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
      let tweetsFormatted = Array<String>();

      if (tweetsContent.length > 0) {
        if (tweetsContent.length <= 280) {
              tweetsFormatted.push(tweetsContent);
        } else {
          const nbrOfTweets: number = Math.ceil(tweetsContent.length / 280);
          const tweetsCountTemplate: string = `\n${nbrOfTweets}/${nbrOfTweets}`;
          const regex = new RegExp(`.{1,${280 - tweetsCountTemplate.length}}`, 'g');
          const tweets: string[] = tweetsContent.trim().match(regex) || Array<string>();

          tweetsFormatted = tweets.map((tweet, index) => {
            if (nbrOfTweets === 1) {
              return tweet;
            }
            const tweetCountTemplate = tweetsCountTemplate.replace(`${nbrOfTweets}`, `${index + 1}`);

            return `${tweet}${tweetCountTemplate}`;
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
