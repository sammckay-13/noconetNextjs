export class Member {
    constructor(
      private _name: string,
      private _email: string,
      private _phoneNumber: string,
      private _mostRecentSignIn: Date
    ) {}
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(value: string) {
      this._email = value;
    }
  
    get phoneNumber(): string {
      return this._phoneNumber;
    }
  
    set phoneNumber(value: string) {
      this._phoneNumber = value;
    }
  
    get mostRecentSignIn(): Date {
      return this._mostRecentSignIn;
    }
  
    set mostRecentSignIn(value: Date) {
      this._mostRecentSignIn = value;
    }
  
    set updateFrom(member: Member) {
      this._name = member.name;
      this._email = member.email;
      this._phoneNumber = member.phoneNumber;
      this._mostRecentSignIn = member.mostRecentSignIn;
    }
  }
  