import { registerMethods } from '../utils/register-methods';
import { TimePeriods } from './timeperiods-module';
import { Attestations } from '../attestations/attestations-module';

export const api = registerMethods('timeperiods', {
  getAllPeriods() {
    const results = [];
    const timePeriods = TimePeriods.db.find().fetch();
    timePeriods.forEach((period) => {
      const attestationCount = Attestations.db.find({timeperiod_id: period._id}).fetch().length;
      results.push({
        start_date: period.start_date,
        end_date: period.end_date ? period.end_date : 'N/A',
        instance: period.instance,
        attestationCount
      });
    });
    return results;
  },
  getMostRecentPeriod() {
    const timePeriods = TimePeriods.db.find({}, {sort: {instance: 1}}).fetch();
    return timePeriods[0];
  }

});