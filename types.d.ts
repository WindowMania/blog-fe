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


// interface PostEditorContext {
//     postId?: string
//     title: string
//     content: string
// }

interface PostEditorModel {
    title: string
    content: string
    tags: string[]
}

interface PostModel {
    postId: string
    title: string
    content: string
    username: string
    createdAt: Date
    updatedAt: Date
    tags: string []
}

// interface PostCreateModel {
//     title: string
//     content: string
//     tags: string[]
// }
//
// interface PostEditModel {
//     postId: string
//     title?: string
//     content?: string
//     tags?: string []
// }


const MenuItems = ["Home", "Login", "PostWrite", "Setting", "Logout"]
type MenuItem = typeof MenuItems[number]
