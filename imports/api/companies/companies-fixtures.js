import { Companies } from './companies-module';

export const fixtures = {
  generateTul() {
    const empresa = { name: 'TUL'};
    const companyId = Companies.db.insert(empresa);
    return companyId;
  }
};