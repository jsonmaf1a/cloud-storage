import { TransformFnParams } from "class-transformer/types/interfaces";
import { Maybe } from "@/common/types/maybe";

export const lowerCaseTransformer = (
    params: TransformFnParams,
): Maybe<string> => params.value?.toLowerCase().trim();
