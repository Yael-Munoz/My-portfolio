import styles from "./List.module.css"
import books from "../../assets/books/books.json"

function List({onBookClick}){

    



    return(<>
    
    <div className={styles.container}>
        <h1 className={styles['title']}>Book Selector</h1>
        <div className={styles['scroll-container']}>


           
            <ul>
                {books.map((book) => (
                    <li key={book.id} className={styles.bookItem} onClick={() => onBookClick(book)}>
                    <img src={`/covers/${book.frontpage}`} alt={book.title} className={styles.bookImage}/>

                    <span className={styles.bookTitle}>{book.title}</span>
                    </li>
                ))}
            </ul>
            
        </div>
    </div>
    
    
    </>);
}


export default List;