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


interface PostEditorContext {
    postId?: string
    title: string
    content: string
}

interface PostContext {
    postId: string
    title: string
    content: string
    username: string
    createdAt: Date
    updatedAt: Date
    tags: string []
}


const MenuItems = ["Home", "Login", "PostWrite", "Setting"]
type MenuItem = typeof MenuItems[number]
