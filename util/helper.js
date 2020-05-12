export const parseError = err => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const dateshtampId = date => {

   let toFormatDate = new Date(parseInt(date));
    // console.log(new Date())
   const year = date.slice(0, 4);
   const month = date.slice(4,6);
   const day = date.slice(6,8);
   let dateId = new Date();
console.log(year, " ",  month, " ", day);
   dateId
       .setFullYear(year, month, day);
   dateId
       .setHours(0, 0, 0, 0);
    // console.log(dateId)

    return dateId.getTime();
};