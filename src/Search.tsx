import React, {ChangeEvent} from 'react';
import './App.css';
import Book from "./Book";
import {IBook, IMoveableBookList, ISearchState, IBookError} from "./types";
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

class Search extends React.Component<IMoveableBookList, ISearchState> {
    constructor(props:IMoveableBookList) {
        super(props);
        this.performSearch = _.debounce(this.performSearch.bind(this), 500);
        this.state = {
            results:[],
            query: ""
        }
    }
    async performSearch(query:string){
        const results:IBook[] = await getResults(query);
        this.setState((currentState:ISearchState)=>{
            return {
                ...currentState,
                results
            };
        })
    }
    onChange(e:ChangeEvent){
        const query = (e.target as HTMLSelectElement).value;
        this.setState((currentState:ISearchState)=>{
            return {
                ...currentState,
                query
            };
        });
        this.performSearch(query);
    }
    render(){
        const results = this.state.results || [];
        let element;
        if(results.length === 0){
            element = (<p>
                No results
            </p>);
        }
        else{
            const bookElements = results

                .map( (book:IBook)=> {
                    // add in the correct shelf if it exists in your shelves
                    const currentBook = this.props.books.find(b => book.id === b.id);
                    return currentBook ? {...book, shelf: currentBook.shelf} : book;
                })
                .map((book:IBook)=>{
                    // create DOM
                    return <Book onMove={this.props.onMove} key={book.id} book={book}/>
                });

            element = <ol className="books-grid">
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
                    {element}
                </div>
            </div>
        );
    }
}

export default Search;
