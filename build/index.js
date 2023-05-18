"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = /*#__PURE__*/ _interopRequireDefault(require("dotenv"));
const _puppeteer = /*#__PURE__*/ _interopRequireDefault(require("puppeteer"));
const _twitter = require("./twitter");
const _fastify = /*#__PURE__*/ _interopRequireDefault(require("fastify"));
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const { PORT ="3000" , HEADLESS ="new"  } = process.env;
const fastify = (0, _fastify.default)({
    logger: true
});
let browser;
const tweetsSchema = {
    schema: {
        querystring: {
            type: "object",
            properties: {
                limit: {
                    type: "number",
                    default: 10
                },
                details: {
                    type: "string",
                    enum: [
                        "full",
                        "simple"
                    ],
                    default: "simple"
                }
            }
        }
    }
};
// Declare a route
fastify.get("/tweets/:user", tweetsSchema, /*#__PURE__*/ _asyncToGenerator(function*(request, reply) {
    const { user  } = request.params;
    const { limit , details  } = request.query;
    const bot = new _twitter.Twitter(browser, user);
    let tweets = yield bot.tweets();
    if (limit) tweets = tweets.slice(0, limit);
    if (details === "simple") {
        reply.send(tweets.map((tweet)=>{
            var _tweet_content_itemContent_tweet_results_result_legacy_entities_media, _tweet_content, _tweet_content_itemContent, _tweet_content1, _tweet_content_itemContent1;
            const media = (_tweet_content_itemContent_tweet_results_result_legacy_entities_media = (_tweet_content = tweet.content) == null ? void 0 : (_tweet_content_itemContent = _tweet_content.itemContent) == null ? void 0 : _tweet_content_itemContent.tweet_results.result.legacy.entities.media) == null ? void 0 : _tweet_content_itemContent_tweet_results_result_legacy_entities_media.find((item)=>item.type === "photo");
            return {
                full_text: (_tweet_content1 = tweet.content) == null ? void 0 : (_tweet_content_itemContent1 = _tweet_content1.itemContent) == null ? void 0 : _tweet_content_itemContent1.tweet_results.result.legacy.full_text.split("\n").join(" "),
                url: media == null ? void 0 : media.url
            };
        }));
    } else {
        reply.send(tweets);
    }
}));
function main() {
    return _main.apply(this, arguments);
}
function _main() {
    _main = _asyncToGenerator(function*() {
        browser = yield _puppeteer.default.launch({
            headless: HEADLESS
        });
        fastify.listen({
            port: parseInt(PORT)
        }).catch((err)=>{
            fastify.log.error(err);
            process.exit(1);
        });
    });
    return _main.apply(this, arguments);
}
main();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW52IGZyb20gXCJkb3RlbnZcIjtcbmVudi5jb25maWcoKTtcbmltcG9ydCBwdXBwZXRlZXIsIHsgQnJvd3NlciB9IGZyb20gXCJwdXBwZXRlZXJcIjtcbmltcG9ydCB7IFR3aXR0ZXIgfSBmcm9tIFwiLi90d2l0dGVyXCI7XG5pbXBvcnQgRmFzdGlmeSBmcm9tIFwiZmFzdGlmeVwiO1xuaW1wb3J0IHsgRGV0YWlsVmFsdWUsIEhlYWRsZXNzVHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5jb25zdCB7IFBPUlQgPSBcIjMwMDBcIiwgSEVBRExFU1MgPSBcIm5ld1wiIH0gPSBwcm9jZXNzLmVudiBhcyB7XG4gIFBPUlQ6IHN0cmluZztcbiAgSEVBRExFU1M6IEhlYWRsZXNzVHlwZTtcbn07XG5jb25zdCBmYXN0aWZ5ID0gRmFzdGlmeSh7XG4gIGxvZ2dlcjogdHJ1ZSxcbn0pO1xuXG5sZXQgYnJvd3NlcjogQnJvd3NlcjtcblxuY29uc3QgdHdlZXRzU2NoZW1hID0ge1xuICBzY2hlbWE6IHtcbiAgICBxdWVyeXN0cmluZzoge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGltaXQ6IHsgdHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMTAgfSxcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wiZnVsbFwiLCBcInNpbXBsZVwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcInNpbXBsZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gRGVjbGFyZSBhIHJvdXRlXG5mYXN0aWZ5LmdldChcIi90d2VldHMvOnVzZXJcIiwgdHdlZXRzU2NoZW1hLCBhc3luYyBmdW5jdGlvbiAocmVxdWVzdCwgcmVwbHkpIHtcbiAgY29uc3QgeyB1c2VyIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IHVzZXI6IHN0cmluZyB9O1xuICBjb25zdCB7IGxpbWl0LCBkZXRhaWxzIH0gPSByZXF1ZXN0LnF1ZXJ5IGFzIHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIGRldGFpbHM6IERldGFpbFZhbHVlO1xuICB9O1xuICBjb25zdCBib3QgPSBuZXcgVHdpdHRlcihicm93c2VyLCB1c2VyKTtcbiAgbGV0IHR3ZWV0cyA9IGF3YWl0IGJvdC50d2VldHMoKTtcbiAgaWYgKGxpbWl0KSB0d2VldHMgPSB0d2VldHMuc2xpY2UoMCwgbGltaXQpO1xuICBpZiAoZGV0YWlscyA9PT0gXCJzaW1wbGVcIikge1xuICAgIHJlcGx5LnNlbmQoXG4gICAgICB0d2VldHMubWFwKCh0d2VldCkgPT4ge1xuICAgICAgICBjb25zdCBtZWRpYSA9XG4gICAgICAgICAgdHdlZXQuY29udGVudD8uaXRlbUNvbnRlbnQ/LnR3ZWV0X3Jlc3VsdHMucmVzdWx0LmxlZ2FjeS5lbnRpdGllcy5tZWRpYT8uZmluZChcbiAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLnR5cGUgPT09IFwicGhvdG9cIlxuICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZnVsbF90ZXh0OlxuICAgICAgICAgICAgdHdlZXQuY29udGVudD8uaXRlbUNvbnRlbnQ/LnR3ZWV0X3Jlc3VsdHMucmVzdWx0LmxlZ2FjeS5mdWxsX3RleHRcbiAgICAgICAgICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgIC5qb2luKFwiIFwiKSxcbiAgICAgICAgICB1cmw6IG1lZGlhPy51cmwsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcmVwbHkuc2VuZCh0d2VldHMpO1xuICB9XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgYnJvd3NlciA9IGF3YWl0IHB1cHBldGVlci5sYXVuY2goe1xuICAgIGhlYWRsZXNzOiBIRUFETEVTUyxcbiAgfSk7XG4gIGZhc3RpZnkubGlzdGVuKHsgcG9ydDogcGFyc2VJbnQoUE9SVCkgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgIGZhc3RpZnkubG9nLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9KTtcbn1cbm1haW4oKTtcbiJdLCJuYW1lcyI6WyJlbnYiLCJjb25maWciLCJQT1JUIiwiSEVBRExFU1MiLCJwcm9jZXNzIiwiZmFzdGlmeSIsIkZhc3RpZnkiLCJsb2dnZXIiLCJicm93c2VyIiwidHdlZXRzU2NoZW1hIiwic2NoZW1hIiwicXVlcnlzdHJpbmciLCJ0eXBlIiwicHJvcGVydGllcyIsImxpbWl0IiwiZGVmYXVsdCIsImRldGFpbHMiLCJlbnVtIiwiZ2V0IiwicmVxdWVzdCIsInJlcGx5IiwidXNlciIsInBhcmFtcyIsInF1ZXJ5IiwiYm90IiwiVHdpdHRlciIsInR3ZWV0cyIsInNsaWNlIiwic2VuZCIsIm1hcCIsInR3ZWV0IiwibWVkaWEiLCJjb250ZW50IiwiaXRlbUNvbnRlbnQiLCJ0d2VldF9yZXN1bHRzIiwicmVzdWx0IiwibGVnYWN5IiwiZW50aXRpZXMiLCJmaW5kIiwiaXRlbSIsImZ1bGxfdGV4dCIsInNwbGl0Iiwiam9pbiIsInVybCIsIm1haW4iLCJwdXBwZXRlZXIiLCJsYXVuY2giLCJoZWFkbGVzcyIsImxpc3RlbiIsInBvcnQiLCJwYXJzZUludCIsImNhdGNoIiwiZXJyIiwibG9nIiwiZXJyb3IiLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7OzZEQUFnQjtnRUFFbUI7eUJBQ1g7OERBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSHBCQSxlQUFHLENBQUNDLE1BQU07QUFNVixNQUFNLEVBQUVDLE1BQU8sT0FBTSxFQUFFQyxVQUFXLE1BQUssRUFBRSxHQUFHQyxRQUFRSixHQUFHO0FBSXZELE1BQU1LLFVBQVVDLElBQUFBLGdCQUFPLEVBQUM7SUFDdEJDLFFBQVEsSUFBSTtBQUNkO0FBRUEsSUFBSUM7QUFFSixNQUFNQyxlQUFlO0lBQ25CQyxRQUFRO1FBQ05DLGFBQWE7WUFDWEMsTUFBTTtZQUNOQyxZQUFZO2dCQUNWQyxPQUFPO29CQUFFRixNQUFNO29CQUFVRyxTQUFTO2dCQUFHO2dCQUNyQ0MsU0FBUztvQkFDUEosTUFBTTtvQkFDTkssTUFBTTt3QkFBQzt3QkFBUTtxQkFBUztvQkFDeEJGLFNBQVM7Z0JBQ1g7WUFDRjtRQUNGO0lBQ0Y7QUFDRjtBQUVBLGtCQUFrQjtBQUNsQlYsUUFBUWEsR0FBRyxDQUFDLGlCQUFpQlQsNEJBQWMsa0JBQUEsVUFBZ0JVLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0lBQ3pFLE1BQU0sRUFBRUMsS0FBSSxFQUFFLEdBQUdGLFFBQVFHLE1BQU07SUFDL0IsTUFBTSxFQUFFUixNQUFLLEVBQUVFLFFBQU8sRUFBRSxHQUFHRyxRQUFRSSxLQUFLO0lBSXhDLE1BQU1DLE1BQU0sSUFBSUMsZ0JBQU8sQ0FBQ2pCLFNBQVNhO0lBQ2pDLElBQUlLLFNBQVMsTUFBTUYsSUFBSUUsTUFBTTtJQUM3QixJQUFJWixPQUFPWSxTQUFTQSxPQUFPQyxLQUFLLENBQUMsR0FBR2I7SUFDcEMsSUFBSUUsWUFBWSxVQUFVO1FBQ3hCSSxNQUFNUSxJQUFJLENBQ1JGLE9BQU9HLEdBQUcsQ0FBQyxDQUFDQyxRQUFVO2dCQUVsQkEsdUVBQUFBLDRDQUtFQTtZQU5KLE1BQU1DLFFBQ0pELENBQUFBLHdFQUFBQSxDQUFBQSxpQkFBQUEsTUFBTUUsT0FBTyxZQUFiRixLQUFBQSxJQUFBQSw4QkFBQUEsZUFBZUcsdUJBQWZILEtBQUFBLElBQUFBLDJCQUE0QkksY0FBY0MsTUFBTSxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ04sS0FBSyxZQUF0RUQsS0FBQUEsSUFBQUEsc0VBQXdFUSxLQUN0RSxDQUFDQyxPQUFTQSxLQUFLM0IsSUFBSSxLQUFLO1lBRTVCLE9BQU87Z0JBQ0w0QixXQUNFVixDQUFBQSxrQkFBQUEsTUFBTUUsT0FBTyxZQUFiRixLQUFBQSxJQUFBQSwrQkFBQUEsZ0JBQWVHLHVCQUFmSCxLQUFBQSxJQUFBQSw0QkFBNEJJLGNBQWNDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDSSxTQUFTLENBQzlEQyxLQUFLLENBQUMsTUFDTkMsSUFBSSxDQUFDLElBQUk7Z0JBQ2RDLEtBQUtaLGdCQUFBQSxLQUFBQSxJQUFBQSxNQUFPWSxHQUFHO1lBQ2pCO1FBQ0Y7SUFFSixPQUFPO1FBQ0x2QixNQUFNUSxJQUFJLENBQUNGO0lBQ2IsQ0FBQztBQUNIO1NBRWVrQjtXQUFBQTs7U0FBQUE7SUFBQUEsUUFBZixrQkFBQSxZQUFzQjtRQUNwQnBDLFVBQVUsTUFBTXFDLGtCQUFTLENBQUNDLE1BQU0sQ0FBQztZQUMvQkMsVUFBVTVDO1FBQ1o7UUFDQUUsUUFBUTJDLE1BQU0sQ0FBQztZQUFFQyxNQUFNQyxTQUFTaEQ7UUFBTSxHQUFHaUQsS0FBSyxDQUFDLENBQUNDLE1BQVE7WUFDdEQvQyxRQUFRZ0QsR0FBRyxDQUFDQyxLQUFLLENBQUNGO1lBQ2xCaEQsUUFBUW1ELElBQUksQ0FBQztRQUNmO0lBQ0Y7V0FSZVg7O0FBU2ZBIn0=