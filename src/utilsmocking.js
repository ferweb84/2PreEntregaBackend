import { faker } from "@faker-js/faker/locale/es";

global.counter = 0

// export const generateUser = () => {

//     let numOfProducts = faker.number.int({ min: 0, max: 15 });
    
//     let products=[];

//     for(let i=0; i < numOfProducts; i++) {
//         products.push (generateProduct());
//     }

//     return {
//         _id: faker.database.mongodbObjectId(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         email: faker.internet.email(),
//         phone: faker.phone.number(),
//         job: faker.person.jobTitle(),
//         sex: faker.person.sex(),
//         image: faker.internet.avatar(),
//         birthDate: faker.date.birthdate(),
//         premium: faker.datatype.boolean(),
//         role,
//         products,
//     };
// };

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({min: 100, max: 3500}),
        status: faker.number.int({min: 0, max: 1}),
        code: faker.string.alphanumeric(8),
        stock: faker.number.int({ min: 0, max: 100 }),
        category: faker.commerce.department(),
        thumbnails: [faker.image.url({width: 200, height: 200})],
        _id: faker.database.mongodbObjectId()
    };
};