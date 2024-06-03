function createEmployeeRecord(employee) {
  const obj = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return obj
}

function createEmployeeRecords(employeeData) {
  const employeeRecords = []
  employeeData.forEach(employee => {
    const record = createEmployeeRecord(employee)
    employeeRecords.push(record)
  })
  return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(11,13) + "00"),
    date: dateStamp.slice(0,10)
  }

  employeeRecord.timeInEvents.push(timeIn)
  return employeeRecord
}


const employee = createEmployeeRecord(["Gabby", "", "", 3])
const updatedEmployee = createTimeInEvent(employee, "2024-07-07 1230")
console.log(updatedEmployee)