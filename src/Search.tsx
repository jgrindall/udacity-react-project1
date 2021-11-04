import React, {ChangeEvent} from 'react';
import './App.css';
import Book from "./Book";
import {IAppState, IBook, ISearchProps, ISearchState, IBookError} from "./types";
import {search} from "./BooksAPI";
import * as _ from 'underscore';
import {Link} from "react-router-dom";

async function getResults(query:string): Promise<IBook[] | IBookError>{
    const trimmed = query.trim();
    if(trimmed.length === 0){
        // do not send empty queries
        return Promise.resolve([]);
    }
    else{
        const books: IBook[] | IBookError = await search(query);
        if( (books as IBookError)?.error){
            return [];
        }
        return books || [];
    }
}

class Search extends React.Component<ISearchProps, ISearchState> {
    constructor(props:ISearchProps) {
        super(props);
        this.performSearch = _.debounce(this.performSearch.bind(this), 500);
        this.state = {
            books:[],
            query: ""
        }
    }
    async performSearch(query:string){
        const books:IBook[] = await getResults(query);
        this.setState((currentState:IAppState)=>{
            return {
                ...currentState,
                books
            };
        })
    }
    onChange(e:ChangeEvent){
        const query = e.target.value;
        this.setState((currentState:IAppState)=>{
            return {
                ...currentState,
                query
            };
        });
        this.performSearch(query);
    }
    render(){
        const books = this.state.books || [];
        let results;
        if(books.length === 0){
            results = <p>
                No results
            </p>;
        }
        else{
            const bookElements = books
                .map( (book:IBook)=> {
                    // add in the correct shelf if it exists in your shelves
                    const currentBook = this.props.books.find(b => book.id === b.id);
                    return currentBook ? {...book, shelf: currentBook.shelf} : book;
                })
                .map((book:IBook)=>{
                    // create DOM
                    return <Book onMove={this.props.onMove} key={book.id} book={book}/>
                });

            results = <ol className="books-grid">
                {bookElements}
            </ol>;
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={{
                        pathname: '/'
                    }}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.query}
                            onChange={(e)=>this.onChange(e)}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {results}
                </div>
            </div>
        );
    }
}

export default Search;
