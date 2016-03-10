export class User {
    Id: string;
    Name: string;
    LastName: string;
    Age: number;
    constructor(name: string, lastName: string, age: number, id?: string) {
        this.Id = id || '';
        this.Name = name;
        this.LastName = lastName;
        this.Age = age;
    }
}
