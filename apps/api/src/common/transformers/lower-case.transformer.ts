import { Maybe } from "@cloud/shared";
import { TransformFnParams } from "class-transformer/types/interfaces";

export const lowerCaseTransformer = (
    params: TransformFnParams,
): Maybe<string> => params.value?.toLowerCase().trim();
