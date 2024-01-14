// a) who has worked for 7 consecutive days.

//importing xlsx library in order to work with xlsx files and fetch data from them.
const XLSX = require('xlsx');
const workbook = XLSX.readFile('/content/Assignment_Timecard.xlsx');

// This line creates a constant variable (sheet_name_list) and assigns it the list of sheet names from an Excel workbook (workbook).
const sheet_name_list = workbook.SheetNames;

//Here, another constant variable (data) is created. It uses the sheet_to_json function from the XLSX.utils object to convert the data in the first sheet (index 0) of the workbook into a JSON format.
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


