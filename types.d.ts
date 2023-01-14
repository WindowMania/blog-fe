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
    content: string
    tags: string[]
}

interface PostModel {
    post_id: string
    title: string
    body: string
    username: string
    created_at: Date
    updated_at: Date
    tags: string []
}


const MenuItems = ["Home", "Login", "PostWrite", "Setting", "Logout"]
type MenuItem = typeof MenuItems[number]
