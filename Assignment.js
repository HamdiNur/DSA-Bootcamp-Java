// function calculateExpectedRevenue(startDate, endDate, monthlyRevenue) {
//   // Ensure start date is before end date
//   if (startDate > endDate) {
//     startDate, endDate = endDate, startDate;
//   }

//   const results = [];
//   let currentMonth = startDate.getMonth();
//   let currentYear = startDate.getFullYear();

//   while (currentYear < endDate.getFullYear() ||
//          (currentYear === endDate.getFullYear() && currentMonth <= endDate.getMonth())) {
//     let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     let weekdays = (new Date(currentYear, currentMonth, daysInMonth - 1)).getDay(); // Get last day of month's weekday
//     let fridaysInMonth = weekdays // Number of complete weeks
//       + (weekdays % 5 >= 4 ? 1 : 0); // Add 1 if last day is Thursday or later

//     // Calculate days from current month to end date (if applicable)
//     let daysToEndDate = 0;
//     if (currentYear === endDate.getFullYear() && currentMonth === endDate.getMonth()) {
//       daysToEndDate = endDate.getDate() - startDate.getDate();
//       weekdays = endDate.getDay();
//       fridaysInMonth = weekdays // Number of complete weeks
//         + (weekdays % 5 >= 4 ? 1 : 0); // Add 1 if last day is Thursday or later
//     }

//     // Calculate effective days (excluding Fridays)
//     let effectiveDays = daysInMonth - fridaysInMonth;
//     if (daysToEndDate > 0) {
//       effectiveDays += daysToEndDate - fridaysInMonth;
//     }

//     // Calculate expected revenue for the month
//     let expectedRevenue = monthlyRevenue * effectiveDays / daysInMonth;

//     // Add result to the list
//     results.push("month" + (currentMonth + 1) + " $" + expectedRevenue.toFixed(2));
//     // results.push(month${currentMonth + 1} $${expectedRevenue.toFixed(2)});

//     // Move to the next month
//     currentMonth++;
//     if (currentMonth > 11) {
//       currentMonth = 0;
//       currentYear++;
//     }
//   }

//   return results;

// }
// // Example usage
// const startDate = new Date(2024, 1, 1); 
// const endDate = new Date(2024, 1, 6); // March 4, 2024
// const monthlyRevenue = 435;

// const expectedRevenue = calculateExpectedRevenue(startDate, endDate, monthlyRevenue);

// console.log(expectedRevenue.join("\n"));


function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
   // Convert start and end dates to Date objects
   const start = new Date(startDate);
   const end = new Date(endDate);
 
   // Calculate the number of days between the start and end dates
   const days = Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
 
   // Initialize variables
   let daysExcludingFridays = 0;
   let daysWorkedExcludingFridays = 0;
 
   // Iterate over each day in the period
   for (let i = 0; i < days; i++) {
     // Get the current date
     const currentDate = new Date(start.getTime() + i * (24 * 60 * 60 * 1000));
 
     // Check if the current day is not a Friday
     if (currentDate.getDay() !== 5) {
       daysExcludingFridays++;
 
       // Check if the current day is not a Saturday or Sunday
       if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
         daysWorkedExcludingFridays++;
       }
     }
   }
 
   // Calculate the adjusted target amount based on the number of working days
   const adjustedTarget = (daysWorkedExcludingFridays / daysExcludingFridays) * totalAnnualTarget;
 
   // Calculate the average target per month
   const averageTargetPerMonth = adjustedTarget / 12;
 
   // Create the output object
   const output = {
     daysExcludingFridays: [daysExcludingFridays],
     daysWorkedExcludingFridays: [daysWorkedExcludingFridays],
     monthlyTarget: [averageTargetPerMonth],
     totalTarget: adjustedTarget
   };
 
   return output;
 }
 console.log(calculateTotalTarget('2024-01-01', '2024-01-6', 5220));
 