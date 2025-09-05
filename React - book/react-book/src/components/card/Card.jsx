import styles from "./Card.module.css"


function Card({book}){

      if (!book) {
    return (
      <div className={styles.container}>
        <div className={styles['select-boook-message']}><h2>Select a book to view details</h2></div>
      </div>
    );
  }

    return(<>

    <div className={styles.container}>
        <div className={styles['card-container']}>

            <img src={`/covers/${book.frontpage}`} alt={book.title} className={styles['book-cover']}></img>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.description}>{book.description}</p>
            <p className={styles.author}>Author: {book.author}</p>

        </div>



        

    </div>
    
    
    
    
    </>);
}


export default Card;