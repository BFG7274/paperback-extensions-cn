(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MH90 = exports.MH90Info = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const MH90Parser_1 = require("./MH90Parser");
const MH90_DOMAIN = 'http://www.90mh.com';
const MH90_IMAGE_BASE_URL = 'http://js.tingliu.cc';
exports.MH90Info = {
    version: '0.1.0',
    name: '90漫画网',
    description: 'www.90mh.com',
    author: 'BFG7274',
    authorWebsite: 'https://github.com/BFG7274',
    icon: "favicon.ico",
    websiteBaseURL: MH90_DOMAIN,
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
};
class MH90 extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 1.5,
            requestTimeout: 15000,
        });
        this.baseUrl = MH90_DOMAIN;
        this.userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`;
        this.parser = new MH90Parser_1.Parser();
    }
    getMangaShareUrl(mangaId) {
        return `${MH90_DOMAIN}/manhua/${mangaId}/`;
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${MH90_DOMAIN}/manhua/${mangaId}/`,
                method: 'GET',
                headers: this.constructHeaders({})
            });
            const data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            return this.parser.parseMangaDetails($, mangaId);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${MH90_DOMAIN}/manhua/${mangaId}/`,
                method: "GET",
                headers: this.constructHeaders({})
            });
            const data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            let chapters = this.parser.parseChapterList($, mangaId);
            return chapters;
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = `${MH90_DOMAIN}/manhua/${mangaId}/${chapterId}.html`;
            let request = createRequestObject({
                url: requestUrl,
                method: 'GET',
                headers: this.constructHeaders({})
            });
            let data = yield this.requestManager.schedule(request, 1);
            let pages = [];
            // let $ = this.cheerio.load(data.data)
            let [imagePath, imageList] = this.parser.parseChapterDetails(data.data);
            imageList.forEach(element => {
                if (element.includes('http') || imagePath === '')
                    pages.push(element.replace(/\\/g, ''));
                else
                    pages.push(`${MH90_IMAGE_BASE_URL}/${imagePath}${element}`);
            });
            if (pages.length === 0)
                pages.push('https://i.imgur.com/sFH87kM.png');
            return createChapterDetails({
                id: chapterId,
                mangaId: mangaId,
                pages: pages,
                longStrip: false
            });
        });
    }
    getSearchResults(query, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let searchUrl = '';
            if (query.title) {
                searchUrl = `${MH90_DOMAIN}/search/?keywords=${encodeURI((_b = query.title) !== null && _b !== void 0 ? _b : '')}&page=${page}`;
            }
            else if (query.includedTags) {
                searchUrl = `${MH90_DOMAIN}/list/${query.includedTags[0].id}/update/`;
            }
            let request = createRequestObject({
                url: searchUrl,
                method: 'GET',
                headers: this.constructHeaders({}),
            });
            let data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            let manga = this.parser.parseHomeSection($, this.cheerio);
            let mData;
            if (!this.parser.isLastPage($)) {
                mData = { page: (page + 1) };
            }
            else {
                mData = undefined;
            }
            return createPagedResults({
                results: manga,
                metadata: mData,
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = [
                {
                    request: createRequestObject({
                        url: `${MH90_DOMAIN}/rank/click-daily/`,
                        method: 'GET',
                        headers: this.constructHeaders({})
                    }),
                    section: createHomeSection({
                        id: '0',
                        title: '日排行',
                        view_more: false,
                        type: paperback_extensions_common_1.HomeSectionType.featured,
                    }),
                },
                {
                    request: createRequestObject({
                        url: `${MH90_DOMAIN}/update/`,
                        method: 'GET',
                        headers: this.constructHeaders({})
                    }),
                    section: createHomeSection({
                        id: '1',
                        title: '最近更新',
                        view_more: true,
                    }),
                },
                {
                    request: createRequestObject({
                        url: `${MH90_DOMAIN}/list/lianzai/click/`,
                        method: 'GET',
                        headers: this.constructHeaders({})
                    }),
                    section: createHomeSection({
                        id: '2',
                        title: '热门连载',
                        view_more: true,
                    }),
                }
            ];
            const promises = [];
            for (const section of sections) {
                sectionCallback(section.section);
                promises.push(this.requestManager.schedule(section.request, 1).then(response => {
                    const $ = this.cheerio.load(response.data);
                    section.section.items = this.parser.parseHomeSection($, this.cheerio);
                    sectionCallback(section.section);
                }));
            }
            yield Promise.all(promises);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let webPage = '';
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            switch (homepageSectionId) {
                case '1': {
                    webPage = `/update/${page}/`;
                    break;
                }
                case '2': {
                    webPage = `/list/lianzai/click/${page}/`;
                    break;
                }
            }
            let request = createRequestObject({
                url: `${MH90_DOMAIN}${webPage}`,
                method: 'GET',
                headers: this.constructHeaders({})
            });
            let data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            let manga = this.parser.parseHomeSection($, this.cheerio);
            let mData;
            if (!this.parser.isLastPage($)) {
                mData = { page: (page + 1) };
            }
            else {
                mData = undefined;
            }
            return createPagedResults({
                results: manga,
                metadata: mData
            });
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${MH90_DOMAIN}`,
                method: 'GET',
                headers: this.constructHeaders({})
            });
            let data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            let tags = this.parser.parseTags($);
            return tags;
        });
    }
    /// Won't work
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const mangaToUpdate = [];
            let request = createRequestObject({
                url: `${MH90_DOMAIN}/update/`,
                method: 'GET',
                headers: this.constructHeaders({})
            });
            let data = yield this.requestManager.schedule(request, 1);
            let $ = this.cheerio.load(data.data);
            let updatedManga = this.parser.getUpdatedManga($, time);
            updatedManga.forEach(element => {
                if (ids.includes(element))
                    mangaToUpdate.push(element);
            });
            mangaUpdatesFoundCallback(createMangaUpdates({ ids: mangaToUpdate }));
        });
    }
    constructHeaders(headers, refererPath) {
        if (this.userAgentRandomizer !== '') {
            headers["user-agent"] = this.userAgentRandomizer;
        }
        headers["referer"] = `${this.baseUrl}${refererPath !== null && refererPath !== void 0 ? refererPath : ''}`;
        headers["content-type"] = "application/x-www-form-urlencoded";
        return headers;
    }
    globalRequestHeaders() {
        if (this.userAgentRandomizer !== '') {
            return {
                "referer": `${this.baseUrl}/`,
                "user-agent": this.userAgentRandomizer,
                "accept": "image/jpeg,image/png,image/*;q=0.8"
            };
        }
        else {
            return {
                "referer": `${this.baseUrl}/`,
                "accept": "image/jpeg,image/png,image/*;q=0.8"
            };
        }
    }
}
exports.MH90 = MH90;

},{"./MH90Parser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
class Parser {
    parseMangaDetails($, mangaId) {
        var _a;
        let infoElement = $('div[class="book-cont cf"]');
        let mainTitle = $('div.book-title > h1', infoElement).text().trim();
        let secondaryTitles = $('div.book-title > h2', infoElement).text().split(',').map(i => i.trim());
        let image = $('img.pic', $('div[class="book-cover item-xl fl"]', infoElement)).attr('src');
        let status = paperback_extensions_common_1.MangaStatus.ONGOING, author, released, rating = 0, artist, views, summary;
        let tagArray0 = [];
        let mangaDetail = $('div[class="book-detail pr fr"]', infoElement);
        author = $('span:contains(漫画作者：) > a', mangaDetail).text().trim();
        summary = $('div#intro-all', mangaDetail).text().trim();
        released = $('li.status > span > span', mangaDetail).first().text();
        let statusViewsParagraph = $('li.status > span', mangaDetail);
        status = statusViewsParagraph.text().includes('连载中') ? paperback_extensions_common_1.MangaStatus.ONGOING : paperback_extensions_common_1.MangaStatus.COMPLETED;
        // It may work uncorrectly
        views = Number((_a = /\D*(\d*(\.\d*)?).*/.exec($('a', statusViewsParagraph).last().text())) === null || _a === void 0 ? void 0 : _a[1]);
        rating = +$('p.score-avg > em', $('div.total', $('div#scoreRes'))).text();
        let tags = $('span:contains(漫画剧情：) > a', mangaDetail).toArray();
        tags.forEach(element => {
            var _a, _b;
            let id = (_b = /\/list\/([^\/]*)\/?/.exec((_a = $(element).attr('href')) !== null && _a !== void 0 ? _a : '')) === null || _b === void 0 ? void 0 : _b[1];
            let label = $(element).text().trim();
            if (typeof id === 'undefined' || typeof label === 'undefined')
                return;
            tagArray0.push(createTag({ id: id, label: label }));
        });
        let tagSections = [createTagSection({ id: '0', label: 'tags', tags: tagArray0 })];
        return createManga({
            id: mangaId,
            rating: rating,
            titles: [mainTitle, ...secondaryTitles],
            image: image !== null && image !== void 0 ? image : '',
            status: status,
            author: author !== null && author !== void 0 ? author : '',
            artist: artist,
            views: views,
            tags: tagSections,
            desc: summary !== null && summary !== void 0 ? summary : '',
        });
    }
    parseChapterList($, mangaId) {
        let chapters = [];
        let counter = 1;
        let chapArray = $('div.comic-chapters', $('div#comic-chapter-blocks')).toArray();
        chapArray.forEach(element => {
            let group = $('div[class="caption pull-left"]', element).text().trim();
            let chapList = $('li', element).toArray();
            chapList.forEach(obj => {
                var _a;
                let chapterId = (_a = $('a', obj).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(`/manhua/${mangaId}/`, '').replace('.html', '').trim();
                let chapNum = counter++;
                let chapName = $(obj).text().trim();
                if (typeof chapterId === 'undefined' || isNaN(chapNum))
                    return;
                chapters.push(createChapter({
                    id: chapterId,
                    mangaId: mangaId,
                    chapNum: Number(chapNum),
                    langCode: paperback_extensions_common_1.LanguageCode.CHINEESE,
                    name: chapName,
                    group: group,
                }));
            });
        });
        return chapters;
    }
    parseChapterDetails(data) {
        var _a, _b;
        let imagePath = (_a = /.*var chapterPath = "([^"]*)";(.*)?/.exec(data)) === null || _a === void 0 ? void 0 : _a[1].trim();
        let imageList = (_b = /.*var chapterImages = \[(.*)\];(.*)?/.exec(data)) === null || _b === void 0 ? void 0 : _b[1].replace(/"/g, '').split(',');
        return [imagePath !== null && imagePath !== void 0 ? imagePath : '', imageList !== null && imageList !== void 0 ? imageList : ['']];
    }
    parseHomeSection($, cheerio) {
        let tiles = [];
        let mangaList = $('ul#contList').text() !== '' ? $('ul#contList') : $('ul[class="rank-list clearfix"]');
        for (let obj of $('li', mangaList).toArray()) {
            let coverUrl = $('img', $('a.cover', $(obj))).attr('src');
            let mangaTitle = $('a', $('p.ell', $(obj))).text();
            let mangaUrl = $('a', $('p.ell', $(obj))).attr('href');
            let chpaterInfo = $('span.tt', $('a.cover', $(obj))).text();
            let mangaIdMatchObj = /(https?|http):\/\/www.90mh.com\/manhua\/([^\/]*)/.exec(mangaUrl !== null && mangaUrl !== void 0 ? mangaUrl : '');
            if (mangaIdMatchObj.length !== 3)
                continue;
            let mangaId = mangaIdMatchObj[2];
            // let chpaterNumberMatchObj = /\D*(\d*(\.\d*)?).*/.exec(chpaterInfo)!
            // let chpaterNumber = chpaterNumberMatchObj.length === 3 ? +chpaterNumberMatchObj[1] : 0
            tiles.push(createMangaTile({
                id: mangaId,
                title: createIconText({ text: mangaTitle }),
                image: coverUrl !== null && coverUrl !== void 0 ? coverUrl : ''
            }));
        }
        return tiles;
    }
    parseTags($) {
        let tagSections = [];
        const typeList = ['剧情', '进度', '地区', '字母'];
        for (let obj in typeList) {
            let tagList = $('li', $(`label:contains(${typeList[obj]})`, $('div[class="filter-nav clearfix"]')).parent()).toArray();
            tagList.shift();
            tagSections.push(createTagSection({
                id: obj,
                label: typeList[obj],
                tags: tagList.map(element => {
                    var _a, _b;
                    return createTag({
                        id: (_b = (_a = $('a', element).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(/\/list\//g, '').replace(/\//g, '')) !== null && _b !== void 0 ? _b : '',
                        label: $(element).text(),
                    });
                }),
            }));
        }
        return tagSections;
    }
    getUpdatedManga($, time) {
        var _a, _b, _c;
        let updatedMange = [];
        let mangaList = $('ul#contList').text() !== '' ? $('ul#contList') : $('ul[class="rank-list clearfix"]');
        for (let obj of $('li', mangaList).toArray()) {
            let mangaUrl = $('a', $('p.ell', $(obj))).attr('href');
            let mangaIdMatchObj = /(https?|http):\/\/www.90mh.com\/manhua\/([^\/]*)/.exec(mangaUrl !== null && mangaUrl !== void 0 ? mangaUrl : '');
            if (mangaIdMatchObj.length !== 3)
                continue;
            let mangaId = mangaIdMatchObj[2];
            let updateOn = $('span.updateon', obj).text();
            let dateInfo = /\D*(\d*)-(\d*)-(\d*)(.*)?/.exec(updateOn);
            let updateDate = new Date((_a = +(dateInfo === null || dateInfo === void 0 ? void 0 : dateInfo[1])) !== null && _a !== void 0 ? _a : time.getFullYear(), (_b = +(dateInfo === null || dateInfo === void 0 ? void 0 : dateInfo[2])) !== null && _b !== void 0 ? _b : time.getMonth(), (_c = +(dateInfo === null || dateInfo === void 0 ? void 0 : dateInfo[3])) !== null && _c !== void 0 ? _c : time.getDay());
            if (updateDate > time)
                updatedMange.push(mangaId);
        }
        return updatedMange;
    }
    isLastPage($) {
        return $('li.next').text() === '';
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":5}]},{},[48])(48)
});
