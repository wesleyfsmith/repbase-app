import { TimePeriods } from './timeperiods-module';
import moment from 'moment';

export const fixtures = {
  generateTimePeriodStartingWeekAgo(companyId) {
    const timePeriodId = TimePeriods.db.insert({
      start_date: moment().subtract(7, 'days').calendar(),
      instance: TimePeriods.db.find().count(),
      company_id: companyId
    });
    return timePeriodId;
  },
  generateTenTimePeriodsFromNow(companyId) {
    for (let i = 10; i >= 1; i--) {
      TimePeriods.db.insert({
        start_date: moment().subtract(14 * i, 'days').calendar(),
        instance: TimePeriods.db.find().count(),
        company_id: companyId
      });
    }
  }
};