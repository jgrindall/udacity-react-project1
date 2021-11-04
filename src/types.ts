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

export enum Shelf {
    SHELF_CURRENTLY_READING = "currentlyReading",
    SHELF_WANT_TO_READ = "wantToRead",
    SHELF_READ = "read"
}

type MoveFn = (selectedBook:IBook, shelf:Shelf) => void;

export interface IAppState {
    books: IBook[]
}

export interface IMoveableBook {
    book: IBook;
    onMove:MoveFn;
}

export interface IMoveableBookList{
    books:IBook[],
    onMove:MoveFn
}

export interface IOption {
    disabled:boolean,
    value:string,
    label:string
}

export interface IBookError {
    error:string,
    items:any[]
}

export interface IBookshelf extends IMoveableBookList{
    label:string
}

export interface ISearchState{
    results:IBook[],
    query:string
}