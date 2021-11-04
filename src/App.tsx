import * as React from 'react';
import './App.css';
import Search from './Search';
import List from './List';
import {IAppState, IBook, Shelf} from "./types";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import {getAll, update} from "./BooksAPI";

class App extends React.Component<{}, IAppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount(){
        this.loadBooks();
    }

    async loadBooks(){
        const books:IBook[] = await getAll();
        this.setState((currentState:IAppState)=>{
            return {
                ...currentState,
                books
            };
        })
    }

    async onAdd(selectedBook:IBook, shelf:Shelf){
        const currentBook = this.state.books.find(book => book.id === selectedBook.id);
        if(currentBook){
            await this.onMove(selectedBook, shelf);
        }
        else{
            await update(selectedBook, shelf);
            this.loadBooks();
        }
        alert("book added to your chosen shelf");
    }

    async onMove(selectedBook:IBook, shelf:Shelf){
        await update(selectedBook, shelf);
        const books = this.state.books.map(book=>{
            if(book.id === selectedBook.id){
                return {
                    ...book,
                    shelf:shelf
                }
            }
            else{
                return book;
            }
        });
        this.setState((currentState:IAppState)=>{
            return {
                ...currentState,
                books
            };
        });
    }

    render() {
        const list  = () =>  <List
            onMove={this.onMove.bind(this)}
            books={this.state.books}>
        </List>;

        const search = () => <Search
            onMove={this.onAdd.bind(this)}
            books={this.state.books}>
        </Search>;

        return (
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <div className="app">
                            <Route exact path='/' render={ list } />
                            <Route exact path='/search' render={ search } />
                        </div>
                    </header>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
