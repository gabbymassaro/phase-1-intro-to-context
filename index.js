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

  return (Math.abs(startTime - endTime) / 100)
}

function wagesEarnedOnDate (employeeRecord, date) {
  const payPerHour = employeeRecord.payPerHour

  return payPerHour * hoursWorkedOnDate(employeeRecord, date)
}

function allWagesFor (employeeRecord) {
 let totalWages = 0;

 employeeRecord.timeInEvents.forEach(event => {
   totalWages += wagesEarnedOnDate(employeeRecord, event.date)
 })

 return totalWages
}

function calculatePayroll (employeeArray) {
  let payroll = 0

  employeeArray.forEach(function(employeeRecord) {
    payroll += allWagesFor(employeeRecord)
  })

  return payroll
}