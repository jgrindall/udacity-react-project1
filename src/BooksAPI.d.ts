import {IBook, IBookError} from "./types";

export const get: (bookId:string) => Promise<IBook>;

export const getAll: () => Promise<IBook[]>;

export const update: (book:IBook, shelf:string) => Promise<any>;

export const search: (query:string) => Promise<IBook[] | IBookError>;
