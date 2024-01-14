// c) Who has worked for more than 14 hours in a single shift

const XLSX = require('xlsx');
const workbook = XLSX.readFile('/content/Assignment_Timecard.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Convert the 'Start Time' and 'Time Out' columns to datetime format
data.forEach((row) => {
  row['Start Time'] = new Date(row['Start Time']);
  row['Time Out'] = new Date(row['Time Out']);
});

// Calculate the duration of each shift
data.forEach((row) => {
  row['Shift Duration'] = row['Time Out'] - row['Start Time'];
});

// Filter the data to only include employees who have worked for more than 14 hours in a single shift
const filteredData = data.filter((row) => {
  const shiftDurationHours = (row['Shift Duration'] / (1000 * 60 * 60));
  return shiftDurationHours > 14;
});

// Print the name and position of each employee who meets the criteria
filteredData.forEach((row) => {
  console.log(row['Employee Name'], row['Position ID']);
});