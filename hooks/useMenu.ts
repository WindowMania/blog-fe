import useLogin from "@/hooks/useLogin";
import useMyRouter from "@/hooks/useMyRouter";


export function useMenu() {
    const {isLogin, setLogout} = useLogin()
    const {route,routeReplace} = useMyRouter()

    async function onClickMenu(item: MenuItem) {
        switch (item) {
            case "PostWrite":
                await route("POST_WRITE")
                break
            case "SeriesWrite":
                await routeReplace("SERIES_WRITE")
                break
            case "Logout":
                setLogout()
            case "Login":
                await route("LOGIN")
                break
            case "Home":
            default:
                await route("HOME")
                break
        }
    }

    function koMenuItem(item: MenuItem) {
        switch (item) {
            case "PostWrite":
                return "글 쓰기"
            case "SeriesWrite":
                return "시리즈 만들기"
            case "Logout":
                return "로그아웃"
            case "Login":
                return "로그인"
            case "Home":
                return "홈"
        }
        return item
    }

    function translateMenuItem(item: MenuItem, language: string = 'ko') {
        if (language === 'ko') {
            return koMenuItem(item)
        }
    }

    let items = ["Login"]
    if (isLogin) {
        items = ["PostWrite", "SeriesWrite", "Setting", "Logout"]
    }
    return {menuItems: items, onClickMenu, translateMenuItem}
}