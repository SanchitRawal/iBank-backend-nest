import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
   getSampleData(): string {
        return 'hiiiii'
    }

    getSignIn(): void {
        
    }
}