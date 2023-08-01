import { faker } from "@faker-js/faker";
import { createHash } from "../../src/utils/utils.js";
export class UserMock {
    constructor(){}

    mockUser = () => {
        const mockUser = {
            first_name: faker.person.firstName({sex: "male"}),
            last_name: faker.person.lastName({sex: "male"}),
            email: faker.internet.email({firstName: "test", allowSpecialCharacters: false}),
            age: 11,
            password: createHash("password"),
            role: "admin",
        };

        return mockUser;
    }
}