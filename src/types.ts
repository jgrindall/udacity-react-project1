
export interface IAppState {
    books: IBook[]
}

export enum Shelf {
    SHELF_CURRENTLY_READING = "currentlyReading",
    SHELF_WANT_TO_READ = "wantToRead",
    SHELF_READ = "read"
}

export interface IOption {
    disabled:boolean,
    value:string,
    label:string
}

export type Action = Shelf | "move" | "none";

export interface IBook{
    id:string,
    title:string,
    description:string,
    subtitle: string,
    authors:string[],
    imageLinks:{
        smallThumbnail:string
    },
    shelf?: Shelf
}

export interface IBookError {
    error:string,
    items:any[]
}

export interface IBookListProps{
    books:IBook[],
    onMove:Function
}

export interface IBookshelfProps{
    books:IBook[],
    onMove:Function,
    label:string
}

export interface IBookProps{
    book:IBook,
    onMove:Function
}

export interface ISearchProps{
    books:IBook[],
    onMove:Function
}

export interface ISearchState{
    books:IBook[],
    query:string
}