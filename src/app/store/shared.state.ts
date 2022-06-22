
export interface sharedState {
    errorMsg: string;
    showLoader: boolean;
}

export const initialState: sharedState = {
    errorMsg: '',
    showLoader: false
}