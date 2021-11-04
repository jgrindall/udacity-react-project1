import React from 'react';
import './App.css';
import Bookshelf from './Bookshelf';
import {IBookListProps, Shelf} from "./types";
import {Link} from "react-router-dom";
import {getLabel} from "./Labels";

const shelves = [
    Shelf.SHELF_CURRENTLY_READING,
    Shelf.SHELF_WANT_TO_READ,
    Shelf.SHELF_READ
];

class List extends React.Component<IBookListProps> {
    render(){

        const books = shelves.map(shelf => this.props.books.filter(book => book.shelf === shelf));

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            onMove={this.props.onMove}
                            books={books[0]}
                            label={getLabel(shelves[0])}>
                        </Bookshelf>
                        <Bookshelf
                            onMove={this.props.onMove}
                            books={books[1]}
                            label={getLabel(shelves[1])}>
                        </Bookshelf>
                        <Bookshelf
                            onMove={this.props.onMove}
                            books={books[2]}
                            label={getLabel(shelves[2])}>
                        </Bookshelf>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={{
                        pathname: '/search'
                    }}>Add a book</Link>

                </div>
            </div>
        );
    }
}

export default List;
