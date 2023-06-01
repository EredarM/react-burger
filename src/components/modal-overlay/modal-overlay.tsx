import styles from './modal-overlay.module.css';

const ModalOverlay = ({onClick}: {onClick: () => void}) => {
    return (
        <div onClick={onClick} className={styles.overlay}/>
    );
};

export default ModalOverlay;