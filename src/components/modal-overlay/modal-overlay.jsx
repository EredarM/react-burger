import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({onClick}) => {
    return (
        <div onClick={onClick} className={styles.overlay}/>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;