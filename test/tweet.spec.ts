import {expect} from "chai";
import {Tweet} from "../src/api/tweets/tweets.service";


describe('getTweetsByHashtag', () => {
    it('checking getTweetsByHashtag ok result',
        async () => {
            let twitterData = await Tweet.getTweetsByHashtag('#hashtag');
            expect(twitterData).to.be.an('array');
            expect(twitterData).to.have.lengthOf(100);
            for (let i = 0; i < twitterData.length; i++) {
                expect(twitterData).to.have.deep.property(`[${i}].id`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].text`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].username`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].userScreenName`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].userImage`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].date`).that.is.a('string')
                expect(twitterData).to.have.deep.property(`[${i}].likes`).that.is.a('number')
                expect(twitterData).to.have.deep.property(`[${i}].retweetCount`).that.is.a('string' || 'undefined')
            }

        })
    it('checking getTweetsByHashtag bad result', async () => {
        let twitterData = await Tweet.getTweetsByHashtag('#havrkjvbejkshtag');
        expect(twitterData).to.be.equal([]);
    })
});
