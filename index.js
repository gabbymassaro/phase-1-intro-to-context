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

// const employee = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// const timeInEmployee = createTimeInEvent(employee, "0044-03-15 0900")
// const timeOutEmployee = createTimeOutEvent(employee, "0044-03-15 1100")
// const hoursWorked = hoursWorkedOnDate(employee,"0044-03-15")
// const wagesEarnedOn = wagesEarnedOnDate(employee,"0044-03-15")
// const allWages = allWagesFor(employee)



// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//   ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//   ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//   ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//   ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//   let [dIn, dOut] = d
//   sRecord = createTimeInEvent(sRecord, dIn)
//   sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//   let [dIn, dOut] = d
//   rRecord = createTimeInEvent(rRecord, dIn)
//   rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]

// calculatePayroll(employees)
