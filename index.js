// a) who has worked for 7 consecutive days.

const XLSX = require('xlsx');
const workbook = XLSX.readFile('/content/Assignment_Timecard.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Calculate the number of consecutive days worked for each employee
const consecutiveDaysWorked = {};
data.forEach((row) => {
  if (!consecutiveDaysWorked[row['Employee Name']]) {
    consecutiveDaysWorked[row['Employee Name']] = 1;
  } else {
    const prevDate = new Date(data[data.indexOf(row) - 1]['Time']);
    const currentDate = new Date(row['Time']);
    const diffTime = Math.abs(currentDate - prevDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      consecutiveDaysWorked[row['Employee Name']]++;
    } else {
      consecutiveDaysWorked[row['Employee Name']] = 1;
    }
  }
});

// Filter the data to only include employees who have worked for 7 consecutive days
const filteredData = data.filter((row) => consecutiveDaysWorked[row['Employee Name']] === 7);

// Print the name and position of each employee who has worked for 7 consecutive days
filteredData.forEach((row) => {
  console.log(row['Employee Name'], row['Position ID']);
});


