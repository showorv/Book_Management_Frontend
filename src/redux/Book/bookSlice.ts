import type { iBook } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";



interface initial {
    book: iBook[]
}

const initialState: initial= {
    book: []
}

const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers: {

    }
})

export const bookSelector = (state: RootState)=>{

    

        return state.books.book
 
}

export default bookSlice.reducer;