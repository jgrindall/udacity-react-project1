import React from 'react';
import './App.css';
import Book from "./Book";
import {IBookshelfProps} from "./types";

class Bookshelf extends React.Component<IBookshelfProps> {
    render(){
        const books = this.props.books.map(book=>{
            return <Book onMove={this.props.onMove} key={book.id} book={book}/>
        });

        const list = books.length === 0 ? <p>No books found</p> : <ol className="books-grid">{books}</ol>;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.label}</h2>
                <div className="bookshelf-books">
                    {list}
                </div>
            </div>
        );
    }
}

export default Bookshelf;
