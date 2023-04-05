import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ConstructorNavElement.module.css";

const ConstructorNavElement = () => {
    return (
        <div className={`${styles.section__btnContainer} mb-10`}>
            <Tab value="Булки" active={true} onClick={''}>
                Булки
            </Tab>
            <Tab value="Соусы" active={false} onClick={''}>
                Соусы
            </Tab>
            <Tab value="Начинка" active={false} onClick={''}>
                Начинка
            </Tab>
        </div>
    );
}

export default ConstructorNavElement;