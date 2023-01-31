import { IsEmail, Length } from "class-validator";

export class CreateCustomerInputs {
  @IsEmail()
  email: string;

  @Length(10)
  phone: string;

  @Length(10, 20)
  password: string;
}

export interface CustomerPayloads{
    _id: string;
    email: string;
    verified: boolean;
}


export interface EditCustomerProfileIneputs{
    firstName: string;
    lastName: string;
    address: string;
}

export class CustomerLoginInputs {
    @IsEmail()
    email: string;
    @Length(10, 20)
    password: string;
  }

//   edit 

