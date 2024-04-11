interface ErrorObject {
  [key: string]: string[];
}

export type ErrorMessage = string | string[] | ErrorObject[] | ErrorObject;
