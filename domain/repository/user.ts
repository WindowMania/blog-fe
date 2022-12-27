export default class UserRepository {

    public static auth20_login(platform: "google" | "github", access_key: string) {
        return async () => {
            const res = await fetch("http://localhost:8000/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        platform,
                        access_key
                    }),
                }
            )
            return res.json()
        }
    }
}