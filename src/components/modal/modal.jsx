import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from "./modal.module.css";

const Modal = ({children, title, onClose}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const modalRoot = document.getElementById("react-modals");

    const onEscClose = React.useCallback(
        (evt) => {
            if (evt.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    React.useEffect(
        () => {
            document.addEventListener("keydown", onEscClose);
            return () => {
                document.removeEventListener("keydown", onEscClose);
            };
        },
        [onEscClose]
    );

    const handleIcon = React.useCallback(
        () => setIsHovered(!isHovered),
        [isHovered]
    );

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClick={onClose}/>
                <div className={styles.modal}>
                    <div className={`${styles.modal__head} ml-10 mr-10 mt-10 mb-8`}>
                        <p className={`text text_type_main-large`}>{title}</p>
                        <div className={styles.modal__button} onClick={onClose} onMouseEnter={handleIcon}
                             onMouseLeave={handleIcon}>
                            <CloseIcon type={isHovered ? "secondary" : "primary"}/>
                        </div>
                    </div>
                    {children}
                </div>
            </>
        ),
        modalRoot
    )
};

Modal.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    onClose: PropTypes.func
};

export default Modal;