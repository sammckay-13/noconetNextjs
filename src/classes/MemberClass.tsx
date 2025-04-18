export class Member {
    private _name: string;
    private _email: string;
    private _phoneNumber: string;

    constructor(name: string, email: string, phoneNumber: string) {
        this._name = name;
        this._email = email;
        this._phoneNumber = phoneNumber;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set name(newName: string) {
        this._name = newName;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    set phoneNumber(newPhoneNumber: string) {
        this._phoneNumber = newPhoneNumber;
    }

    set clear(newVal: Member) {
        this._name = newVal.name;
        this._email = newVal.email;
        this._phoneNumber = newVal.phoneNumber;
    }
}
