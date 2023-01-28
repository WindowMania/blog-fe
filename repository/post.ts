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

export default class PostRepository {

    static getBaseUrl() {
        if (typeof window !== 'undefined') {
            return env.backUrl
        }
        return env.ssrBackUrl
    }


    static async getPosts(curPage: number, perPage: number, tags: string [] = ["All"]): Promise<PostModel []> {
        let url = PostRepository.getBaseUrl() + `/post/list?page=${curPage}&perPage=${perPage}`
        tags.forEach((tag) => {
            url += "&tags=" + tag
        })
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

}

