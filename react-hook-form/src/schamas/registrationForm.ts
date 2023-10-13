import * as yup from 'yup';
import { genderCode } from '../components/RegistrationForm';
import type { InferType } from 'yup';

export const regFormSchema = yup.object({
    username: yup.string().required('必須項目です'),
    zipcode: yup.string().max(7).matches(/\d{7}/, '7 桁の数字で入力してください'),
    gender: yup.mixed().oneOf(Object.keys(genderCode)),
    isAgreed: yup.boolean().oneOf([true], '同意が必要です').required(),
});

export type RegFormSchema = InferType<typeof regFormSchema>;
