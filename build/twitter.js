"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Twitter", {
    enumerable: true,
    get: ()=>Twitter
});
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
let Twitter = class Twitter {
    tweets() {
        var _this = this;
        return new Promise(/*#__PURE__*/ _asyncToGenerator(function*(resolve, reject) {
            const page = yield _this.browser.newPage();
            yield page.setViewport({
                width: 1080,
                height: 1024
            });
            page.on("response", /*#__PURE__*/ _asyncToGenerator(function*(response) {
                const request = response.request();
                if (request.url().includes("UserTweets")) {
                    var _instructions_entries;
                    const responseBody = yield response.json();
                    const instructions = responseBody.data.user.result.timeline_v2.timeline.instructions.find((instruction)=>instruction.type === "TimelineAddEntries");
                    if (!instructions) return reject("No instructions found");
                    const entries = (_instructions_entries = instructions.entries) == null ? void 0 : _instructions_entries.filter((entry)=>entry.entryId.startsWith("tweet"));
                    if (!entries) return reject("No entries found");
                    resolve(entries);
                }
            }));
            yield page.goto(`https://twitter.com/${_this.user}`, {
                waitUntil: "networkidle2"
            }).finally(()=>page.close());
        }));
    }
    constructor(browser, user){
        this.user = user;
        this.browser = browser;
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90d2l0dGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdXBwZXRlZXIsIHsgQnJvd3NlciwgUGFnZSB9IGZyb20gXCJwdXBwZXRlZXJcIjtcbmltcG9ydCB7IEVudHJ5RWxlbWVudCwgVHdpdHRlclJlc3BvbnNlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUd2l0dGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSB1c2VyOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlcjogQnJvd3NlcjtcblxuICBjb25zdHJ1Y3Rvcihicm93c2VyOiBCcm93c2VyLCB1c2VyOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIHRoaXMuYnJvd3NlciA9IGJyb3dzZXI7XG4gIH1cblxuICB0d2VldHMoKTogUHJvbWlzZTxFbnRyeUVsZW1lbnRbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBwYWdlID0gYXdhaXQgdGhpcy5icm93c2VyLm5ld1BhZ2UoKTtcbiAgICAgIGF3YWl0IHBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTA4MCwgaGVpZ2h0OiAxMDI0IH0pO1xuICAgICAgcGFnZS5vbihcInJlc3BvbnNlXCIsIGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gcmVzcG9uc2UucmVxdWVzdCgpO1xuICAgICAgICBpZiAocmVxdWVzdC51cmwoKS5pbmNsdWRlcyhcIlVzZXJUd2VldHNcIikpIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZUJvZHk6IFR3aXR0ZXJSZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPVxuICAgICAgICAgICAgcmVzcG9uc2VCb2R5LmRhdGEudXNlci5yZXN1bHQudGltZWxpbmVfdjIudGltZWxpbmUuaW5zdHJ1Y3Rpb25zLmZpbmQoXG4gICAgICAgICAgICAgIChpbnN0cnVjdGlvbikgPT4gaW5zdHJ1Y3Rpb24udHlwZSA9PT0gXCJUaW1lbGluZUFkZEVudHJpZXNcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIWluc3RydWN0aW9ucykgcmV0dXJuIHJlamVjdChcIk5vIGluc3RydWN0aW9ucyBmb3VuZFwiKTtcbiAgICAgICAgICBjb25zdCBlbnRyaWVzID0gaW5zdHJ1Y3Rpb25zLmVudHJpZXM/LmZpbHRlcigoZW50cnkpID0+XG4gICAgICAgICAgICBlbnRyeS5lbnRyeUlkLnN0YXJ0c1dpdGgoXCJ0d2VldFwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFlbnRyaWVzKSByZXR1cm4gcmVqZWN0KFwiTm8gZW50cmllcyBmb3VuZFwiKTtcbiAgICAgICAgICByZXNvbHZlKGVudHJpZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgcGFnZVxuICAgICAgICAuZ290byhgaHR0cHM6Ly90d2l0dGVyLmNvbS8ke3RoaXMudXNlcn1gLCB7XG4gICAgICAgICAgd2FpdFVudGlsOiBcIm5ldHdvcmtpZGxlMlwiLFxuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiBwYWdlLmNsb3NlKCkpO1xuICAgIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVHdpdHRlciIsInR3ZWV0cyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGFnZSIsImJyb3dzZXIiLCJuZXdQYWdlIiwic2V0Vmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsIm9uIiwicmVzcG9uc2UiLCJyZXF1ZXN0IiwidXJsIiwiaW5jbHVkZXMiLCJpbnN0cnVjdGlvbnMiLCJyZXNwb25zZUJvZHkiLCJqc29uIiwiZGF0YSIsInVzZXIiLCJyZXN1bHQiLCJ0aW1lbGluZV92MiIsInRpbWVsaW5lIiwiZmluZCIsImluc3RydWN0aW9uIiwidHlwZSIsImVudHJpZXMiLCJmaWx0ZXIiLCJlbnRyeSIsImVudHJ5SWQiLCJzdGFydHNXaXRoIiwiZ290byIsIndhaXRVbnRpbCIsImZpbmFsbHkiLCJjbG9zZSIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7OytCQUdhQTs7YUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTixJQUFBLEFBQU1BLFVBQU4sTUFBTUE7SUFTWEMsU0FBa0M7O1FBQ2hDLE9BQU8sSUFBSUMsc0JBQVEsa0JBQUEsVUFBT0MsU0FBU0MsUUFBVztZQUM1QyxNQUFNQyxPQUFPLE1BQU0sTUFBS0MsT0FBTyxDQUFDQyxPQUFPO1lBQ3ZDLE1BQU1GLEtBQUtHLFdBQVcsQ0FBQztnQkFBRUMsT0FBTztnQkFBTUMsUUFBUTtZQUFLO1lBQ25ETCxLQUFLTSxFQUFFLENBQUMsMEJBQVksa0JBQUEsVUFBT0MsVUFBYTtnQkFDdEMsTUFBTUMsVUFBVUQsU0FBU0MsT0FBTztnQkFDaEMsSUFBSUEsUUFBUUMsR0FBRyxHQUFHQyxRQUFRLENBQUMsZUFBZTt3QkFPeEJDO29CQU5oQixNQUFNQyxlQUFnQyxNQUFNTCxTQUFTTSxJQUFJO29CQUN6RCxNQUFNRixlQUNKQyxhQUFhRSxJQUFJLENBQUNDLElBQUksQ0FBQ0MsTUFBTSxDQUFDQyxXQUFXLENBQUNDLFFBQVEsQ0FBQ1AsWUFBWSxDQUFDUSxJQUFJLENBQ2xFLENBQUNDLGNBQWdCQSxZQUFZQyxJQUFJLEtBQUs7b0JBRTFDLElBQUksQ0FBQ1YsY0FBYyxPQUFPWixPQUFPO29CQUNqQyxNQUFNdUIsVUFBVVgsQ0FBQUEsd0JBQUFBLGFBQWFXLE9BQU8sWUFBcEJYLEtBQUFBLElBQUFBLHNCQUFzQlksT0FBTyxDQUFDQyxRQUM1Q0EsTUFBTUMsT0FBTyxDQUFDQyxVQUFVLENBQUM7b0JBRTNCLElBQUksQ0FBQ0osU0FBUyxPQUFPdkIsT0FBTztvQkFDNUJELFFBQVF3QjtnQkFDVixDQUFDO1lBQ0g7WUFFQSxNQUFNdEIsS0FDSDJCLElBQUksQ0FBQyxDQUFDLG9CQUFvQixFQUFFLE1BQUtaLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDYSxXQUFXO1lBQ2IsR0FDQ0MsT0FBTyxDQUFDLElBQU03QixLQUFLOEIsS0FBSztRQUM3QjtJQUNGO0lBaENBQyxZQUFZOUIsT0FBZ0IsRUFBRWMsSUFBWSxDQUFFO1FBQzFDLElBQUksQ0FBQ0EsSUFBSSxHQUFHQTtRQUNaLElBQUksQ0FBQ2QsT0FBTyxHQUFHQTtJQUNqQjtBQThCRiJ9