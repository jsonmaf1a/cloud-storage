import { InfinitePaginationResponseDto } from "../dto/infinite-pagination-response.dto";
import { PaginationOptions } from "../types/pagination-options";

export const infinitePagination = <T>(
    data: T[],
    options: PaginationOptions,
): InfinitePaginationResponseDto<T> => {
    return {
        data,
        hasNextPage: data.length === options.limit,
    };
};
