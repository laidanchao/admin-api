import { R } from '@dataui/crud/lib/crud/reflection.helper';

export const CrudAcl = (field: string) => (target: any) => {
  if (!field) {
    throw new Error('field is required');
  }

  R.setCrudAuthOptions({
    property: 'user',
    filter: (user) => {
      if (user.roles.includes('ROOT') || user.roles.includes('MANAGER')) {
        return {};
      }
      return { [field]: user.id };
    },
    persist: (user: any) => {
      if (user.roles.includes('ROOT') || user.roles.includes('MANAGER')) {
        return {};
      }
      return { [field]: user.id };
    },
  }, target);
};
