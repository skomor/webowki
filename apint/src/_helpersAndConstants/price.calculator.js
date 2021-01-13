import {DateCalculator} from "./date.calculator";

export class PriceCalculator {
    static  calculatePrice = (price, dailyOrHourly, startDate, endDate) => {
        if(dailyOrHourly == 'h'){
            return  Math.floor(DateCalculator.calculateHours(new Date(startDate),new Date(endDate))*price);
        }else{
            return Math.floor(DateCalculator.calculateNrOfDays(new Date(startDate),new Date(endDate))*price*3);
        }
    }
    static  calculatePrice1 = (price,  startDate, endDate) => {
        if(!(new Date(startDate).getMinutes() === 0 && new Date(startDate).getHours() === 23 && new Date(startDate).getSeconds() === 0)){
            return  Math.floor(DateCalculator.calculateHours(new Date(startDate),new Date(endDate))*price);
        }else{
            return Math.floor(DateCalculator.calculateNrOfDays(new Date(startDate),new Date(endDate))*price*3);
        }
    }
    static   calculateSumPrice = (cartItems, products) => {
        var Price = 0
        if (products.items !== undefined && cartItems !== undefined)
            for (let i = 0; i < products.items.length; i++) {
                for (let j = 0; j < cartItems.length; j++) {
                    if (products.items[i].id == cartItems[j].productId)
                        Price += PriceCalculator.calculatePrice(products.items[i].price, cartItems[j].dailyOrHourly, cartItems[j].startDate, cartItems[j].endDate)
                }

            }
        return Price;
    }
}