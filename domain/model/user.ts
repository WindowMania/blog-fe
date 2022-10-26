class UserProfile {
    constructor(
        private nickName: string,
        private introduce_text: string | null,
        private profile_picture_url: string | null,
        private git_hub_url: string | null,
        private meta_url: string | null,
        private email: string,
    ) {
    }
}


export default class User {
    constructor(
        private readonly id: string,
        private is_deleted: boolean,
        private profile: UserProfile | null
    ) {}
}