import { Meteor } from 'meteor/meteor';
import { registerMethods } from '../utils/register-methods';
import { Companies } from './companies-module';
import { Users } from '../users/users-module';
import { Attestations } from '../attestations/attestations-module';
import { TimePeriods } from '../timeperiods/timeperiods-module';
import { current } from 'daisyui/src/colors';

export const api = registerMethods('companies', {
  create() {
    if (Companies.db.count() > 0) {
      throw new Meteor.Error('company already created');
    }
    return Companies.db.insert({name: 'TUL'});
  },
  read(_id) {
    return Companies.db.findOne(_id);
  },
  getAllEmployees() {
    const employees = Users.db.find({employee_profile: {$exists: true}}).fetch();
    for (let i = 0; i < employees.length; i++) {
      //TODO optimize this query
      const employee = employees[i];
      employee.attestationCount = Attestations.db.find({reciever_id: employee._id}).fetch().length;
    }
    return employees;
  },
  getTop10Employees() { //TODO I dont think im doing this on inicio correctly
    const employees = Users.db.find({employee_profile: {$exists: true}}).fetch();
    const currentTimePeriod = TimePeriods.api.getMostRecentPeriod.call();
    for (let i = 0; i < employees.length; i++) {
      //TODO optimize this query
      const employee = employees[i];
      employee.attestationCount = Attestations.db.find({reciever_id: employee._id, timeperiod_id: currentTimePeriod._id}).fetch().length;
    }
    return employees.sort((a, b) => {
      if (a.attestationCount < b.attestationCount) return -1;
      if (a.attestationCount > b.attestationCount) return 1;
      if (a.attestationCount === b.attestationCount) return 0; 
    }).reverse().slice(0, 10);
  },
  getEmployeesKpisForPeriod(periodId) {
    const employees = Users.db.find({employee_profile: {$exists: true}}).fetch();
    for (let i = 0; i < employees.length; i++) {
      //TODO optimize this query
      const employee = employees[i];
      const attestations = Attestations.db.find({reciever_id: employee._id, timeperiod_id: periodId}).fetch();
      const attestation = attestations[0];
      if (attestations.length > 0 && attestation && attestation.kpi_percentage > 0) {
        employee.registeredKpi = attestation.kpi_percentage + '%';
      } else {
        employee.registeredKpi = '--';
      }
    }
    return employees;
  }

});