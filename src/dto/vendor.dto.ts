export interface CreateVendorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInput{
    email: string;
    password: string;
}

export interface VendorPayloads{
    _id: string;
    name: string;
    foodType: [string];
    email: string;
}

export interface EditVendorInputs{
    name: string;
    foodType: [string];
    address: string;
    phone: string;
}

export interface EditVendorService{
    serviceAvailable: boolean;
}