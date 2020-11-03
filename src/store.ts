import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const rawContentKey = 'rawContent';

export interface Accumulator {
    tweets: string[];
    numberOfStrings: number;
    currentIndex: number;
}

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
      const words: string[] = tweetsContent.trim().split(' ');
      const nbrOfTweets: number = Math.ceil(tweetsContent.length / 280);

      const tweetsFormatted = words.reduce((acc, word) => {
        if (!acc.tweets[acc.currentIndex]) {
            acc.tweets[acc.currentIndex] = '';
        }

        const endTweet = `${acc.currentIndex + 1}/${acc.numberOfStrings}`;
        const tweet = `${acc.tweets[acc.currentIndex]} ${word}\n${endTweet}`;

        if (280 <= tweet.length) {
          acc.tweets[acc.currentIndex] = tweet;
          acc.currentIndex++;
        } else {
          acc.tweets[acc.currentIndex] += `${word} `;
        }

        return acc;
      }, {
          tweets: Array<string>(),
          numberOfStrings: nbrOfTweets,
          currentIndex: 0,
      } as Accumulator)
      .tweets;

      if (1 < nbrOfTweets) {
          tweetsFormatted[nbrOfTweets - 1] += `\n${nbrOfTweets}/${nbrOfTweets}`;
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
