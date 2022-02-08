export interface Product {
        status:string,
        name:string,
        quantity:number,
        type:string,
        price:number,
        mfg:string,
        exp:string,
        
}
export interface AllProduct {
        status:string,
        name:string,
        quantity:number,
        type:string,
        price:number,
        mfg:string,
        exp:string,
        
}
export interface Order{
        name:string,
        quantity:number,
        price:number,
        totalPrice:number
}
export interface getAllOrder{
        name:string,
        quantity:number,
        price:number,
        totalPrice:number,
        paymentMode:string
}
export interface Login{
        username :string ,
        password :string 
}
