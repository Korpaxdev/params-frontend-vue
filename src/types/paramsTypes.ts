export interface ParamFormData {
  cat_id: string;
  data_length: string;
  length: string;
  name: string;
  rus_name?: string | null | undefined;
  scaling: string;
  range: string;
  spn: string;
}

export interface Param extends ParamFormData {
  id: number | null;
  date: string | null;
  status_delete: boolean;
}

export interface SearchParamFields {
  name: string;
  range: string;
  scaling: string;
}

export type FoundBy = {
  [key in keyof SearchParamFields]: boolean;
};

export interface Paginator {
  params: Param[][];
  totalPages: number;
}

export interface ParamPaginator extends Paginator {
  totalPages: number;
}
