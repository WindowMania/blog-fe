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

interface PostUser {
    writerName: String
    writerEmail: String
}


interface PostModel {
    id: string
    title: string
    body: string
    writer: PostUser
    username: string
    createdAt: string
    updatedAt: string
    tags: string []
    deleted: boolean
}

interface ItemData {
    id: string
    viewValue: string
}

type EditorMode = 'edit' | 'create'

const MenuItems = ["Home", "Login", "PostWrite", "Setting", "Logout", "SeriesWrite"]

type MenuItem = typeof MenuItems[number]

type LoadingState = "pending" | "success" | "fail"
type LoadFailStrategy = "redirect" | 'failPage'


