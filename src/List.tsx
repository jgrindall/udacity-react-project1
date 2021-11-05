import React from 'react';
import './App.css';
import Bookshelf from './Bookshelf';
import {IMoveableBookList, Shelf} from "./types";
import {Link} from "react-router-dom";
import {getLabel} from "./Labels";

const shelves = [
    Shelf.SHELF_CURRENTLY_READING,
    Shelf.SHELF_WANT_TO_READ,
    Shelf.SHELF_READ
];

const List = (props:IMoveableBookList) => {
    const books = shelves.map(shelf => props.books.filter(book => book.shelf === shelf));

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        shelves.map( (shelf:Shelf, i:number)=>{
                            return <Bookshelf
                                key={shelf}
                                onMove={props.onMove}
                                books={books[i]}
                                label={getLabel(shelves[i])}>
                            </Bookshelf>
                        })
                    }
                </div>
            </div>
            <div className="open-search">
                <Link to={{
                    pathname: '/search'
                }}>Add a book</Link>

            </div>
        </div>
    );
};

export default List;
