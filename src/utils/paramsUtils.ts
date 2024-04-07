import { FoundBy, Param, SearchParamFields } from "../types/paramsTypes.ts";
import { DEFAULT_PARAMS_PER_PAGE } from "./defaultConstants.ts";

export const createPaginatedParams = (params: Param[]) => {
  const paginatedParams = [];
  for (let i = 0; i < params.length; i += DEFAULT_PARAMS_PER_PAGE) {
    paginatedParams.push(params.slice(i, i + DEFAULT_PARAMS_PER_PAGE));
  }
  return paginatedParams;
};

export const createFilteredParams = (params: Param[], searchFields: SearchParamFields) => {
  return params.filter((param) => {
    const foundBy: FoundBy = {
      name: true,
      range: true,
      scaling: true,
    };
    if (searchFields.name) {
      foundBy.name =
        isIncluded(param.name, searchFields.name) ||
        (!!param.rus_name && isIncluded(param.rus_name, searchFields.name));
    }
    if (searchFields.scaling) {
      foundBy.scaling = isIncluded(param.scaling, searchFields.scaling);
    }
    if (searchFields.range) {
      foundBy.range = isIncluded(param.range, searchFields.range);
    }
    return !Object.values(foundBy).filter((value) => !value).length;
  });
};
const isIncluded = (paramValue: string, searchValue: string): boolean => {
  return paramValue.toLowerCase().includes(searchValue.toLowerCase());
};
