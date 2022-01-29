import cheerio from 'cheerio'
import { Chapter, LanguageCode, Manga, MangaStatus, MangaTile, Tag, TagSection } from 'paperback-extensions-common'
import { updateDo } from 'typescript'

export class Parser {

  parseMangaDetails($: CheerioSelector, mangaId: string): Manga {
    let infoElement = $('div[class="book-cont cf"]')

    let mainTitle = $('div.book-title > h1', infoElement).text().trim()
    let secondaryTitles = $('div.book-title > h2', infoElement).text().split(',').map(i => i.trim())
    let image = $('img.pic', $('div[class="book-cover item-xl fl"]', infoElement)).attr('src')

    let status = MangaStatus.ONGOING, author, released, rating: number = 0, artist, views, summary

    let tagArray0: Tag[] = []
    let mangaDetail = $('div[class="book-detail pr fr"]', infoElement)
    author = $('span:contains(漫画作者：) > a', mangaDetail).text().trim()
    summary = $('div#intro-all', mangaDetail).text().trim()
    released = $('li.status > span > span', mangaDetail).first().text()
    
    let statusViewsParagraph = $('li.status > span', mangaDetail)
    status = statusViewsParagraph.text().includes('连载中') ? MangaStatus.ONGOING : MangaStatus.COMPLETED
    // It may work uncorrectly
    views = Number(/\D*(\d*(\.\d*)?).*/.exec($('a', statusViewsParagraph).last().text())?.[1])

    rating = +$('p.score-avg > em',$('div.total',$('div#scoreRes'))).text()
    let tags = $('span:contains(漫画剧情：) > a', mangaDetail).toArray()
    tags.forEach(element => {
      let id = /\/list\/([^\/]*)\/?/.exec($(element).attr('href') ?? '')?.[1]
      let label = $(element).text().trim()
      if (typeof id === 'undefined' || typeof label === 'undefined') return
      tagArray0.push(createTag({ id: id, label: label }))
    })
    let tagSections: TagSection[] = [createTagSection({ id: '0', label: 'tags', tags: tagArray0 })]
    return createManga({
      id: mangaId,
      rating: rating,
      titles: [mainTitle, ...secondaryTitles],
      image: image ?? '',
      status: status,
      author: author ?? '',
      artist: artist,
      views: views,
      tags: tagSections,
      desc: summary ?? '',
    })
  }

  parseChapterList($: CheerioSelector, mangaId: string): Chapter[] {
    let chapters: Chapter[] = []
    let counter = 1
    let chapArray = $('div.comic-chapters', $('div#comic-chapter-blocks')).toArray()
    chapArray.forEach(element => {
      let group = $('div[class="caption pull-left"]', element).text().trim()
      let chapList = $('li', element).toArray()
      chapList.forEach(obj => {
        let chapterId = $('a', obj).attr('href')?.replace(`/manhua/${mangaId}/`, '').replace('.html', '').trim()
        let chapNum = counter++
        let chapName = $(obj).text().trim()
        if (typeof chapterId === 'undefined' || isNaN(chapNum)) return
        chapters.push(createChapter({
          id: chapterId,
          mangaId: mangaId,
          chapNum: Number(chapNum),
          langCode: LanguageCode.CHINEESE,
          name: chapName,
          group: group,
        }))
      })
    })
    return chapters
  }

  parseChapterDetails(data: string): [string, string[]] {
    let imagePath = /.*var chapterPath = "([^"]*)";(.*)?/.exec(data)?.[1].trim()
    let imageList = /.*var chapterImages = \[(.*)\];(.*)?/.exec(data)?.[1].replace(/"/g, '').split(',')
    return [imagePath ?? '', imageList ?? ['']]
  }

  parseHomeSection($: CheerioSelector, cheerio: any): MangaTile[] {
    let tiles: MangaTile[] = []

    let mangaList = $('ul#contList').text() !== '' ? $('ul#contList') : $('ul[class="rank-list clearfix"]')
    for (let obj of $('li', mangaList).toArray()) {
      let coverUrl = $('img', $('a.cover', $(obj))).attr('src')
      let mangaTitle = $('a', $('p.ell', $(obj))).text()
      let mangaUrl = $('a', $('p.ell', $(obj))).attr('href')
      let chpaterInfo = $('span.tt', $('a.cover', $(obj))).text()
      let mangaIdMatchObj = /(https?|http):\/\/www.90mh.com\/manhua\/([^\/]*)/.exec(mangaUrl ?? '')!
      if (mangaIdMatchObj.length !== 3) continue
      let mangaId = mangaIdMatchObj[2]
      // let chpaterNumberMatchObj = /\D*(\d*(\.\d*)?).*/.exec(chpaterInfo)!
      // let chpaterNumber = chpaterNumberMatchObj.length === 3 ? +chpaterNumberMatchObj[1] : 0
      tiles.push(createMangaTile({
        id: mangaId,
        title: createIconText({ text: mangaTitle }),
        image: coverUrl ?? ''
      }))
    }

    return tiles
  }

  parseTags($: CheerioSelector): TagSection[] {
    let tagSections: TagSection[] = []
    const typeList: string[] = ['剧情', '进度', '地区', '字母']
    for (let obj in typeList) {
      let tagList = $('li', $(`label:contains(${typeList[obj]})`, $('div[class="filter-nav clearfix"]')).parent()).toArray()
      tagList.shift()
      tagSections.push(createTagSection({
        id: obj,
        label: typeList[obj],
        tags: tagList.map(element => {
          return createTag({
            id: $('a', element).attr('href')?.replace(/\/list\//g, '').replace(/\//g, '') ?? '',
            label: $(element).text(),
          })
        }),
      }))
    }
    return tagSections
  }

  getUpdatedManga($: CheerioSelector, time: Date): string[] {
    let updatedMange: string[] = []
    let mangaList = $('ul#contList').text() !== '' ? $('ul#contList') : $('ul[class="rank-list clearfix"]')
    for (let obj of $('li', mangaList).toArray()) {
      let mangaUrl = $('a', $('p.ell', $(obj))).attr('href')
      let mangaIdMatchObj = /(https?|http):\/\/www.90mh.com\/manhua\/([^\/]*)/.exec(mangaUrl ?? '')!
      if (mangaIdMatchObj.length !== 3) continue
      let mangaId = mangaIdMatchObj[2]
      let updateOn = $('span.updateon', obj).text()
      let dateInfo = /\D*(\d*)-(\d*)-(\d*)(.*)?/.exec(updateOn)
      let updateDate = new Date(
        +dateInfo?.[1]! ?? time.getFullYear(),
        +dateInfo?.[2]! ?? time.getMonth(),
        +dateInfo?.[3]! ?? time.getDay())
      if (updateDate > time) updatedMange.push(mangaId)
    }
    return updatedMange
  }

  isLastPage($: CheerioSelector): boolean {
    return $('li.next').text() === ''
  }

}
