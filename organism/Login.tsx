import LoginMolecule from "@/components/molecule/Login"

async function onLoginGoogle(success: boolean, access_key?: string): Promise<void> {
    console.log(access_key)
    const res = await fetch("http://localhost:8000/api/v1/user/reauthorize",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                platform: "google",
                access_key
            }),
        }
    )
    const data = await res.json()
    console.log(data)
}

export default function Login() {
    return (
        <LoginMolecule onGoogleLogin={onLoginGoogle}/>
    )
}