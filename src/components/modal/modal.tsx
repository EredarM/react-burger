import React, {FC} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from "./modal.module.css";
import {IModal} from "../../../declarations/types";

const Modal: FC<IModal> = ({children, title, onClose}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const modalRoot: any = document.getElementById("react-modals");

    const onEscClose = React.useCallback(
        (evt: KeyboardEvent) => {
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

export default Modal;