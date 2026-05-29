export type ApiRequestBody = Record<string, unknown> | FormData | null | undefined;

export type ApiHeaders = {
    'Content-Type'?: string;
    Authorization?: string;
    [key: string]: string | undefined;
};

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

export interface IPagination {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}

export interface IMeta {
    success: boolean;
    status: number;
    message: string | null;
    pagination: IPagination | null;
}

export interface IApiResponse<T> {
    data: T;
    meta: IMeta;
}
