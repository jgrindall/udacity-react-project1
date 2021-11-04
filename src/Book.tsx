import * as React from 'react';
import {IMoveableBook} from "./types";
import {ChangeEvent} from "react";
import ShelfChanger from "./ShelfChanger";

const EMPTY_THUMBNAIL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gMTAwCv/bAEMACgcHCAcGCggICAsKCgsOGBAODQ0OHRUWERgjHyUkIh8iISYrNy8mKTQpISIwQTE0OTs+Pj4lLkRJQzxINz0+O//bAEMBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAHEAZAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAwECBAYFB//EADQQAAECBAIHBwQCAwEAAAAAAAEAAgMEESEFMQYSQVFxgZETIjJhobHBQlLR8HPxFCRT4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDlYcOtCtTIW8KYcOnFaGMQVbD8hwTBDteyY1iY1lkCwy+SnUqnBvkpDTkECNRQWL3pDRnFJ8gtgGDDP1xu6Oma6OQ0KkYFHTb3TL/t8Legug+eFg/pLdCGxfWZ3RrDp6V7F0rDgaoIZEa0NLOmfNcHjuj8bBpimt20B3gitaQOB80HOPh1zCzxIXkvRcyuYSHstcIPNLCDS3VC1uhmtvZCDWxqexuShjU5gsgGtt8LfI4RP4gf9WViRBWhdSjRzNl2mAYTgLZOHMMgtixS0Fxjd4g8Ml7ro8MCjG1AtuCDkJHQd5o6emQ3eyCKnqfwuhksGw/Dry8swPH1uFXdStLoznZWVCScyUDy9ozKqYtBatNwsEm21SgsXmvdawHe6rkibgPnJeJAjRnGFEFC1rWj8p2xTv8AlB8nmoLYUzFhtrqse5oJ3A2WV7c1ume9HiOO1xPqsz2oMbmmv5NEJ5aK5nkUIGsGSc0KjAmtCDsNGI2tAa0/ZToV0QuPNcfozF1Yuruf7hdeMskE+6OCKWy6I3oBSo5ZqUAFNQGngotVRGNIMRx+0n0QfLn3JJ23KU8bE8pTggzuaa2BQrEXy9P/ABCBjU5qS1Oag9PBIvZzZFcwD0K7thqAbXXzzD36k5D8zTqu+lH68tDcPtQP53UqOSlBHCiNqEIJSpw6snHduhuPoU1Z8ROrhkyd0F/sUHzcpb0w5FLegUQCb16VQg55kcAhBLD7prTks7XbVcOQaocTUiNePpIIXf4VE15QDOjqfK+bl9Nq7rRqP20m29atB+Cg9wICK2zUEoJ9UZ/2qV3I1r8UF6rJiztXCJv+Fw9FoDrVrzWLGnauCzf8ZHwg4ApTiruKU4oKa1CbhCW41KEENKvX9/f2yzsfwTmmvPcgrEfQErrtC5rXgBhPhc5vyuTezWC9fQ+MYE/FhuyJa4eoPwg+h1qB+P39Ko56qXWuV5M7pJhsmS0zAivH0Qu8a+w5lB6xdtN1XXAzIXHzOls3FtKS7ITfuiHWNOGz1XlR52dm6/5E3FiA5trqt6CyDu4+L4fKkiNOQmOH06wJ6C68jF9IsPmcOjS0vEfEe8AAhhAzG0rlQwM2U5KCQgs53mkvdtUuckudbkghzwDf3Qkuea2NOCEC4cSu260MfXMrzIcW9/7WpkTzQb2utdWY+JCjNjwHmHEaahwWVkRMa/JBvm8SxDELTMy9zf8Am3ut6BIaxrckoP6Ke06oH1G5Bd5pPabrKDEQNLqZKjnpZelufRBdzq7blIiRKg7lD4nJZ4kXzsgs6IK3aHcULI55JrQdEIKrU3xjihCB7fAOCuzwn92FCEDW+Ic/dXQhAKrsuY90IQUO3n8pSEIExc+fwFni/j5QhAtCEIP/2Q==";

class Book extends React.Component<IMoveableBook, {}> {

    onMove(event:ChangeEvent){
        this.props.onMove(this.props.book, event.target?.value);
    }

    render(){
        const bg = this.props.book.imageLinks?.smallThumbnail || EMPTY_THUMBNAIL;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            backgroundImage: `url(${bg})`
                        }}></div>

                        <ShelfChanger
                            book={this.props.book}
                            onMove={this.onMove.bind(this)}
                        />

                    </div>
                    <div className="book-title">
                        {this.props.book.title}
                    </div>
                    <div className="book-authors">
                        {(this.props.book.authors || []).join(', ')}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
