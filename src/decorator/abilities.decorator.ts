import { TypeSubject } from '@/common';
import { SetMetadata } from '@nestjs/common';

export const CHECK_ABILITY = 'check_ability';

export interface RequiredRule {
  action: string;
  subject: TypeSubject;
  conditions?: any;
}

export const checkAbilities = (...requirements: RequiredRule[]) => {
  console.log('checkAbilities',requirements)
  return SetMetadata(CHECK_ABILITY, requirements);
};
