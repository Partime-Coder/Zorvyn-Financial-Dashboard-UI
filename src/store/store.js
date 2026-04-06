import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/authSlice";
import transactionReducer from "../features/transaction/transactionSlice"
import themeReducer from "../features/theme/themeSlice";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        transactions: transactionReducer,
        theme:themeReducer,
    }
})