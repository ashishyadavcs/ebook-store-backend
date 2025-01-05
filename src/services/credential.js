import bcript from "bcrypt";
export class CredentialService {
    async comparePassword(dbpass, password) {
        return await bcript.compare(password, dbpass);
    }
    async hashPassword(password) {
        return await bcript.hash(password, 10);
    }
}
