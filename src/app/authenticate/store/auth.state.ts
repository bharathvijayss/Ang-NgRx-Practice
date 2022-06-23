import { TokenInfo } from "../models/token-info.model";

export interface authState {
    authData: TokenInfo | null;
}

export const initialState: authState = {
    authData: null
}