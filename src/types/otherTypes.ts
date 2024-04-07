interface ErrorObject {
  [key: string]: string[];
}

export type ErrorMessage = string | ErrorObject;
