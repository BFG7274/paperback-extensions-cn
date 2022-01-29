import {
    Chapter,
    ChapterDetails,
    HomeSection,
    Manga,
    MangaUpdates,
    PagedResults,
    SearchRequest,
    RequestHeaders,
    Source,
    SourceInfo,
    TagSection,
    TagType,
    ContentRating,
    HomeSectionType,
    Tag,
} from "paperback-extensions-common"

import { Parser, } from './MH90Parser'

const MH90_DOMAIN = 'http://www.90mh.com'
const MH90_IMAGE_BASE_URL = 'http://js.tingliu.cc'

export const MH90Info: SourceInfo = {
    version: '0.1.0',
    name: '90漫画网',
    description: 'www.90mh.com',
    author: 'BFG7274',
    authorWebsite: 'https://github.com/BFG7274',
    icon: "favicon.ico",
    websiteBaseURL: MH90_DOMAIN,
    contentRating: ContentRating.EVERYONE,
}

export class MH90 extends Source {

    requestManager = createRequestManager({
        requestsPerSecond: 1.5,
        requestTimeout: 15000,
    })


    baseUrl: string = MH90_DOMAIN
    userAgentRandomizer: string = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`
    parser = new Parser()


    getMangaShareUrl(mangaId: string): string {
        return `${MH90_DOMAIN}/manhua/${mangaId}/`
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {

        let request = createRequestObject({
            url: `${MH90_DOMAIN}/manhua/${mangaId}/`,
            method: 'GET',
            headers: this.constructHeaders({})
        })
        const data = await this.requestManager.schedule(request, 1)

        let $ = this.cheerio.load(data.data)


        return this.parser.parseMangaDetails($, mangaId)
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {

        let request = createRequestObject({
            url: `${MH90_DOMAIN}/manhua/${mangaId}/`,
            method: "GET",
            headers: this.constructHeaders({})
        })

        const data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)

        let chapters = this.parser.parseChapterList($, mangaId)

        return chapters
    }


    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        let requestUrl = `${MH90_DOMAIN}/manhua/${mangaId}/${chapterId}.html`
        let request = createRequestObject({
            url: requestUrl,
            method: 'GET',
            headers: this.constructHeaders({})
        })

        let data = await this.requestManager.schedule(request, 1)
        let pages: string[] = []
        // let $ = this.cheerio.load(data.data)
        let [imagePath, imageList] = this.parser.parseChapterDetails(data.data)
        imageList.forEach(element => {
            if (element.includes('http') || imagePath === '') pages.push(element.replace(/\\/g, ''))
            else pages.push(`${MH90_IMAGE_BASE_URL}/${imagePath}${element}`)
        })
        if (pages.length === 0) pages.push('https://i.imgur.com/sFH87kM.png')
        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: false
        })
    }

    async getSearchResults(query: SearchRequest, metadata: any,): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1

        let searchUrl = ''
        if (query.title) {
            searchUrl = `${MH90_DOMAIN}/search/?keywords=${encodeURI(query.title ?? '')}&page=${page}`
        } else if (query.includedTags) {
            searchUrl = `${MH90_DOMAIN}/list/${query.includedTags[0].id}/update/`
        }
        let request = createRequestObject({
            url: searchUrl,
            method: 'GET',
            headers: this.constructHeaders({}),
        })

        let data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)
        let manga = this.parser.parseHomeSection($, this.cheerio)
        let mData
        if (!this.parser.isLastPage($)) {
            mData = { page: (page + 1) }
        } else {
            mData = undefined
        }

        return createPagedResults({
            results: manga,
            metadata: mData,
        })

    }

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {

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
                    type: HomeSectionType.featured,
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
        ]



        const promises: Promise<void>[] = []

        for (const section of sections) {
            sectionCallback(section.section)

            promises.push(
                this.requestManager.schedule(section.request, 1).then(response => {
                    const $ = this.cheerio.load(response.data)
                    section.section.items = this.parser.parseHomeSection($, this.cheerio)
                    sectionCallback(section.section)
                }),
            )
        }

        await Promise.all(promises)
    }

    async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        let webPage = ''
        let page: number = metadata?.page ?? 1
        switch (homepageSectionId) {
            case '1': {
                webPage = `/update/${page}/`
                break
            }
            case '2': {
                webPage = `/list/lianzai/click/${page}/`
                break
            }
        }
        let request = createRequestObject({
            url: `${MH90_DOMAIN}${webPage}`,
            method: 'GET',
            headers: this.constructHeaders({})
        })

        let data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)
        let manga = this.parser.parseHomeSection($, this.cheerio)
        let mData
        if (!this.parser.isLastPage($)) {
            mData = { page: (page + 1) }
        } else {
            mData = undefined
        }

        return createPagedResults({
            results: manga,
            metadata: mData
        })
    }

    async getSearchTags(): Promise<TagSection[]> {
        let request = createRequestObject({
            url: `${MH90_DOMAIN}`,
            method: 'GET',
            headers: this.constructHeaders({})
        })
        let data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)
        let tags = this.parser.parseTags($)
        return tags
    }

    /// Won't work
    async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        const mangaToUpdate: string[] = []
        let request = createRequestObject({
            url: `${MH90_DOMAIN}/update/`,
            method: 'GET',
            headers: this.constructHeaders({})
        })
        let data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)
        let updatedManga: string[] = this.parser.getUpdatedManga($,time)
        updatedManga.forEach(element => {
            if (ids.includes(element)) mangaToUpdate.push(element)
        })
        mangaUpdatesFoundCallback(createMangaUpdates({ ids: mangaToUpdate }))
    }

    constructHeaders(headers: any, refererPath?: string): any {
        if (this.userAgentRandomizer !== '') {
            headers["user-agent"] = this.userAgentRandomizer
        }
        headers["referer"] = `${this.baseUrl}${refererPath ?? ''}`
        headers["content-type"] = "application/x-www-form-urlencoded"
        return headers
    }

    globalRequestHeaders(): RequestHeaders {
        if (this.userAgentRandomizer !== '') {
            return {
                "referer": `${this.baseUrl}/`,
                "user-agent": this.userAgentRandomizer,
                "accept": "image/jpeg,image/png,image/*;q=0.8"
            }
        }
        else {
            return {
                "referer": `${this.baseUrl}/`,
                "accept": "image/jpeg,image/png,image/*;q=0.8"
            }
        }
    }

}
