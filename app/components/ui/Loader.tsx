
import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={styles.card}>
            <div className={styles.loader}>
                <p>loading</p>
                <div className={styles.words}>
                    <span className={styles.word}>brewing</span>
                    <span className={styles.word}>roasting</span>
                    <span className={styles.word}>pouring</span>
                    <span className={styles.word}>sipping</span>
                    <span className={styles.word}>tasting</span>
                </div>
            </div>
        </div>
    );
}
