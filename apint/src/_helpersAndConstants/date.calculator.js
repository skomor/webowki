


 export class DateCalculator {
     static calculateNrOfDays =(date1, date2)=> {
         var Difference_In_Time = date2.getTime() - date1.getTime()+1;

         return (Difference_In_Time / (1000 * 3600 * 24))+1;
     }
     static  calculateHours=(date1, date2)=>{
         var difference = Math.abs(date1.getTime() - date2.getTime())+1;
         return  (difference  / 1000 / 3600)+1;

     }


 }