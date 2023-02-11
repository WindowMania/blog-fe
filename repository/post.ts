import env from "@/libs/env";
import restApi from "@/libs/RestApi";
import formApi from "@/libs/FormApi";

export interface PostUpdate {
    postId: string
    title: string
    body: string
    tags: string[]
}

export interface PostCreate {
    title: string
    body: string
    tags: string[]
}

export interface SetDeletedPost {
    toDeleted: boolean
    postId: string
}

export interface FileUploadRes {
    uploaded_url: string
}

export interface TagStatistics {
    tag: string
    count: number
}

export interface SearchPost {
    curPage: number
    perPage: number
    tags?: string[]
    title?: string
}

export interface CreateSeriesDto {
    title: string
    body: string
    postIdList: string[]
}

export interface SeriesSearch {
    page: number
    perPage: number
}

export type SeriesWithPostModel = {
    id: string
    title: string
    body: string
    updatedAt: string
    posts: PostModel[]
}


export type SeriesUpdate = {
    id: string
    title?: string
    body?: string
    postIdList: string[]
}


export default class PostRepository {

    static getBaseUrl() {
        if (typeof window !== 'undefined') {
            return env.backUrl
        }
        return env.ssrBackUrl
    }


    static async getPosts(search: SearchPost): Promise<PostModel []> {
        let {tags, curPage, perPage, title} = search
        let url = PostRepository.getBaseUrl() + `/post/list?page=${curPage}&perPage=${perPage}`
        if (Array.isArray(tags) && tags.length >= 1) {
            tags.forEach((tag) => {
                url += "&tags=" + tag
            })
        }
        if (title && title?.length >= 2) {
            url += "&title=" + title
        }
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data['posts'] as PostModel []
        }
        return []
    }

    static async getPost(id: string): Promise<PostModel | undefined> {
        const url = PostRepository.getBaseUrl() + "/post/" + id
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data as PostModel
        }
    }

    static async createPost(data: PostCreate, accessKey: string) {
        const url = PostRepository.getBaseUrl() + "/post"
        const res = await restApi.post(url, data, {accessKey})
        return res
    }

    static async updatePost(post: PostUpdate, accessKey: string) {
        const url = PostRepository.getBaseUrl() + "/post"
        const res = await restApi.put(url, {...post, id: post.postId}, {accessKey})
        return res
    }

    static async setDeletedPost(p: SetDeletedPost, accessKey: string) {
        const url = PostRepository.getBaseUrl() + "/post/set-delete"
        const res = await restApi.put(url, {id: p.postId, deleted: p.toDeleted}, {accessKey})
        return res
    }

    static async addTag(tag: string, accessKey: string) {
        const url = PostRepository.getBaseUrl() + "/post/tag"
        const res = await restApi.post(url, {tag}, {accessKey})
        return res
    }

    static async deleteTag(tag: string, accessKey: string) {
        const url = `${PostRepository.getBaseUrl()}/post/tag?name=${tag}`
        const res = await restApi.delete(url, {accessKey})
        return res
    }

    static async uploadFile(f: File | Blob, accessKey: string): Promise<FileUploadRes | undefined> {
        const url = `${PostRepository.getBaseUrl()}/file`
        const res = await formApi.post(url, f, {accessKey})
        if (res.ok) {
            return {uploaded_url: `${env.backUrl}/file/static/${res.data['file_id']}`}
        }
    }

    static async getTagStatistics(): Promise<TagStatistics[]> {
        const url = `${PostRepository.getBaseUrl()}/post/tag/statistics`
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data['tags'] as TagStatistics[]
        }
        return []
    }

    static async createSeries(createDto: CreateSeriesDto, accessKey: string) {
        const url = PostRepository.getBaseUrl() + "/post/series"
        const res = await restApi.post(url, {
            "title": createDto.title,
            "body": createDto.body,
            "post_id_list": createDto.postIdList
        }, {accessKey})
        return res
    }

    static async getSeriesList(seriesSearch: SeriesSearch) {
        const curPage = seriesSearch.page || 1
        const perPage = seriesSearch.perPage || 10
        const url = PostRepository.getBaseUrl() + `/post/series/list?page=${curPage}&perPage=${perPage}`
        const ret = await restApi.get(url)
        return ret
    }

    static async deleteSeries(seriesId: string, accessKey: string) {
        const url = PostRepository.getBaseUrl() + `/post/series?seriesId=${seriesId}`
        const ret = await restApi.delete(url, {accessKey})
        return ret
    }

    static async getSeriesWithPost(seriesId: string): Promise<SeriesWithPostModel | null> {
        const url = PostRepository.getBaseUrl() + `/post/series-with-post?seriesId=${seriesId}`
        const ret = await restApi.get(url)
        if (!ret.ok) return null
        const series = ret.data['series']
        return {
            id: series.id,
            title: series.title,
            body: series.body,
            updatedAt: series.updated_at,
            posts: series.series_post_list.map((pl: any) => pl['post'] as PostModel)
        }
    }

    static async updateSeries(updatedDto: SeriesUpdate, accessKey: string): Promise<boolean> {
        const url = PostRepository.getBaseUrl() + `/post/series`
        const ret = await restApi.put(url, updatedDto, {
            accessKey
        })
        return ret.ok
    }

    static async getSeriesListByPostId(postId: string): Promise<SeriesWithPostModel[]> {
        const url = PostRepository.getBaseUrl() + `/post/series/post-id/` + postId
        const res = await restApi.get(url)
        if (res.ok) {
            const seriesList = res.data['seriesList']
            return seriesList.map((s: any) => ({
                id: s.id,
                title: s.title,
                body: s.body,
                updatedAt: s.updated_at,
                posts: s.series_post_list.map((pl: any) => pl['post'] as PostModel)
            }))
        }
        return []
    }

}

