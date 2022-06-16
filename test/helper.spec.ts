import {TweetHelper} from "../src/helpers/tweet.helper";
import {expect} from "chai";


describe('tweetsValidation', () => {
    it('checking default options', () => {
        expect(TweetHelper.getValidatedHashtag({'hashtag': 'hashtag'})).to.equal('#hashtag');
        expect(TweetHelper.getValidatedHashtag({'hashtag': '#hashtag'})).to.equal('#hashtag');
        expect(TweetHelper.getValidatedHashtag({'hashtag': 'ha shtag'})).to.equal('#hashtag');
        expect(TweetHelper.getValidatedHashtag({'hashtag': 'hash tag '})).to.equal('#hashtag');
        expect(TweetHelper.getValidatedHashtag({'hashtag': 'hash@fes'})).not.to.equal('#hashtag');
    });
});
