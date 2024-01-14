// b) who have less than 10 hours of time between shifts but greater than 1 hour

const XLSX = require('xlsx');
const workbook = XLSX.readFile('/content/Assignment_Timecard.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Convert the 'Time' and 'Time Out' columns to datetime format
data.forEach((row) => {
  row['Time'] = new Date(row['Time']);
  row['Time Out'] = new Date(row['Time Out']);
});

// Calculate the time difference between consecutive shifts for each employee
const timeBetweenShifts = {};
data.forEach((row) => {
  if (!timeBetweenShifts[row['Employee Name']]) {
    timeBetweenShifts[row['Employee Name']] = null;
  } else {
    const prevDate = new Date(data[data.indexOf(row) - 1]['Time Out']);
    const currentDate = new Date(row['Time']);
    const diffTime = Math.abs(currentDate - prevDate);
    timeBetweenShifts[row['Employee Name']] = diffTime;
  }
});

// Filter the data to only include employees who have worked for less than 10 hours between shifts but greater than 1 hour
const filteredData = data.filter((row) => {
  const timeDiffHours = timeBetweenShifts[row['Employee Name']] / (1000 * 60 * 60);
  return timeDiffHours > 1 && timeDiffHours < 10;
});

// Print the name and position of each employee who meets the criteria
filteredData.forEach((row) => {
  console.log(row['Employee Name'], row['Position ID']);
});