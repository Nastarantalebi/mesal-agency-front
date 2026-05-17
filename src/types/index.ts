export type TPaginatedResponse<T> = {
    count: number,
    next: null,
    previous: null,
    results : T[]
}

export type TOption = {
    label: string,
    value: string,
    children?: TOption[]
}

// export type TColumns = {
//   label: string;
//   sortable: boolean;
//   filterable: boolean;
//   visible: boolean;
//   type: string;
// };

// export type TPaginate = {
//   current_page: number;
//   per_page: number;
//   total: number;
//   last_page: number;
//   has_more: boolean;
// };
