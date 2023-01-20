import env from "@/libs/env";
import restApi from "@/libs/RestApi";

export default class PostRepository {

    static async getPosts(curPage: number, perPage: number): Promise<PostModel []> {
        const url = env.backUrl + `/post/list?page=${curPage}&perPage=${perPage}`
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data['posts'] as PostModel []
        }
        return []
    }

    static async getPost(id: string): Promise<PostModel | undefined> {
        const url = env.backUrl + "/post/" + id
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data as PostModel
        }
    }

}


