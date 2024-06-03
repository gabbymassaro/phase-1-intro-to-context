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

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(11,13) + "00"),
    date: dateStamp.slice(0,10)
  }

  employeeRecord.timeOutEvents.push(timeOut)
  return employeeRecord
}

function hoursWorkedOnDate (employeeRecord, date) {

  const startTimeInEvent = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date);
  const endTimeOutEvent = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);

  const startTime = startTimeInEvent.hour
  const endTime = endTimeOutEvent.hour

  const hoursWorked = (Math.abs(startTime - endTime) / 100)
  return hoursWorked
}




const employee = createEmployeeRecord(["Gabby", "Romanowski", "Dev.", 3])
const timeInEmployee = createTimeInEvent(employee, "2024-07-07 1230")
const timeOutEmployee = createTimeOutEvent(employee, "2024-07-07 0530")
// hoursWorkedOnDate(timeOutEmployee,"2024-07-07")
// hoursWorkedOnDate(timeOutEmployee,"2024-07-09")
