import { registerMethods } from '../utils/register-methods';
import { TimePeriods } from './timeperiods-module';
import { Attestations } from '../attestations/attestations-module';
import { Companies } from '../companies/companies-module';
import moment from 'moment';

export const api = registerMethods('timeperiods', {
  getAllPeriods() {
    const results = [];
    const timePeriods = TimePeriods.db.find({}, {sort: {instance: -1}}).fetch();
    timePeriods.forEach((period) => {
      const attestationCount = Attestations.db.find({timeperiod_id: period._id}).fetch().length;
      results.push({
        start_date: period.start_date,
        end_date: period.end_date ? period.end_date : 'N/A',
        instance: period.instance,
        attestationCount,
        _id: period._id
      });
    });
    return results;
    // return results.slice(1, results.length);
  },
  getMostRecentPeriod() {
    const timePeriods = TimePeriods.db.find({}, {sort: {instance: -1}, limit: 1}).fetch();
    return timePeriods[0];
  },
  getPeriod(periodId) {
    const period = TimePeriods.db.findOne({_id: periodId});
    if (!period.end_date) {
      period.isCurrentPeriod = true;
    } else {
      period.isCurrentPeriod = false;
    }
    return period;
  },
  endPeriod() {
    const currentPeriod = TimePeriods.api.getMostRecentPeriod.call();
    TimePeriods.db.update(currentPeriod._id, {$set: {end_date: new Date()}});
    const tulCompany = Companies.db.findOne();
    const timeperiod = {
      start_date: new Date(),
      instance: TimePeriods.db.find().count(),
      company_id: tulCompany._id
    };
    TimePeriods.db.insert(timeperiod);
  }

});