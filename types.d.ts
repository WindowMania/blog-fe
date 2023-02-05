declare module '*module.css' {
    const styles: {
        [className: string]: string
    }
    export default styles
}


interface BasicRestResponse {
    ok: boolean
    message?: string
    data?: any
    code?: number
}


interface PostEditorModel {
    title: string
    body: string
    tags: string[]
    deleted?: boolean
}

interface SeriesPostModel {
    postId: string
    postTitle: string
}

interface SeriesEditorModel {
    title: string
    body: string
    posts: SeriesPostModel []
}


interface PostModel {
    id: string
    title: string
    body: string
    username: string
    created_at: string
    updated_at: string
    tags: string []
    deleted: boolean
}

interface ItemData {
    id: string
    viewValue: string
}

interface OrderItemData extends ItemData {
    order: number
}


const MenuItems = ["Home", "Login", "PostWrite", "Setting", "Logout"]
type MenuItem = typeof MenuItems[number]

type LoadingState = "pending" | "success" | "fail"
type LoadFailStrategy = "redirect" | 'failPage'


