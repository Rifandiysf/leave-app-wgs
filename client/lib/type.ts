export type MandatoryType = {
    id_mandatory: string;
    title: string;
    is_active: boolean;
    description: string;
    start_date: string;
    end_date: string;
    message: string;
    taken: boolean;
};

export type SpecialLeaveType = {
    id_special: string,
    title: string,
    applicable_gender: string,
    duration: number,
    is_active: boolean,
    description: string,
}

export type PaginationInfo = {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    item: {
        count: number;
        total: number;
        per_page: number;
    };
};


export interface MandatoryPayload {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface SpecialPayload {
    id_special?: string;
    title: string;
    applicable_gender: string;
    duration: number;
    description: string;
}