import { environment } from "src/environments/environment";

export class User {
    constructor(
        public name: string, 
        public email: string,
        public id?: string, 
        public password?: string,
        public role?: string,
        public image?: string,
        public googleAuth: boolean = false
    ) {}

    get imageUrl(): string {
        if (this.image && this.image.includes('http')) {
            return this.image;
        }
        
        return environment.apiUrl + 'uploads/user/' + (this.image || 'no-image');
    }
}