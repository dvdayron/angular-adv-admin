export class User {
    constructor(
        public name: string, 
        public email: string,
        public id?: string, 
        public password?: string,
        public role?: string,
        public image?: string,
        public googleAuth?: boolean
    ) {}
}