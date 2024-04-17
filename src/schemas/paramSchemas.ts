import { object, string } from 'yup';

import { ONLY_NUMBERS, REQUIRED_FIELD_ERROR } from '../utils/messagesConstants.ts';

export const paramAddSchema = object({
  cat_id: string().required(REQUIRED_FIELD_ERROR),
  data_length: string().required(REQUIRED_FIELD_ERROR),
  length: string().required(REQUIRED_FIELD_ERROR),
  name: string().required(REQUIRED_FIELD_ERROR),
  rus_name: string().nullable(),
  scaling: string().required(REQUIRED_FIELD_ERROR),
  range: string().required(REQUIRED_FIELD_ERROR),
  spn: string().required(REQUIRED_FIELD_ERROR).matches(/^\d+$/, ONLY_NUMBERS),
});
