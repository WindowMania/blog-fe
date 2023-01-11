import {JoinUserDto} from "@/components/molecule/login/Login"
import LoginPageMolecule from "@/components/molecule/login/LoginPage";
import {OAuthContext, OAuthLoginResult} from "@/components/molecule/login/LoginOAuthIcon";
import restApi, {RestResponse} from "@/libs/RestApi";

class GithubOAuthContext implements OAuthContext {
    get_client_id(): string {
        return "af25e309d8d0219d5e43";
    }

    get_platform(): string {
        return "github";
    }

    get_url(): string {
        return `https://github.com/login/oauth/authorize?client_id=${this.get_client_id()}`;
    }
}

class GoogleOAuthContext implements OAuthContext {
    get_client_id(): string {
        return "157841089521-n4qi1ohapk3qh9a2i9me3482v9909j8p.apps.googleusercontent.com";
    }

    get_platform(): string {
        return "google";
    }

    get_url(): string {
        const client_id = this.get_client_id()
        const redirect_uri = "http://localhost:3000/callback?platform=google"
        const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        return `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&client_id=${client_id}`;
    }
}


const github_oauth_ctx = new GithubOAuthContext()
const google_oauth_ctx = new GoogleOAuthContext()


async function onJoinSubmit(dto: JoinUserDto): Promise<RestResponse> {
    const url = "http://localhost:8000/api/v1/user/join"
    const res = await restApi.post(url, dto)
    return Promise.resolve(res)
}

async function onOAuthLogin(res: OAuthLoginResult) {
    if (res.success) {
        window.localStorage.setItem("access_key", res.access_key)
        console.log(window.localStorage.getItem("access_key"))
        return Promise.resolve(true)
    }
    return Promise.resolve(false)
}


async function onLogin(username: string, password: string): Promise<RestResponse> {
    const url = "http://localhost:8000/api/v1/user/login"
    const res = await restApi.post(url, {username, password})
    return res
}


export default function LoginPage() {
    return (
        <LoginPageMolecule
            onJoinSubmit={onJoinSubmit}
            googleOAuthCtx={google_oauth_ctx}
            githubOAuthCtx={github_oauth_ctx}
            onOAuthLogin={onOAuthLogin}
            onLogin={onLogin}
        />
    )
}