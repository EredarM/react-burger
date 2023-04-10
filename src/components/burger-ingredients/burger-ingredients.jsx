import BurgerIngredientElements from "./burger-ingredient-elements/burger-ingredient-elements";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './burger-ingredients.module.css';
import global from '../../index.module.css';

const BurgerIngredientNav = () => {
    return (
        <nav className={`${styles.section__btnContainer} mb-10`}>
            <Tab value="Булки" active={true} onClick={''}>
                Булки
            </Tab>
            <Tab value="Соусы" active={false} onClick={''}>
                Соусы
            </Tab>
            <Tab value="Начинка" active={false} onClick={''}>
                Начинка
            </Tab>
        </nav>
    );
}

const BurgerIngredients = ({data}) => {
    const buns = data.filter(item => item.type === 'bun');
    const mains = data.filter(item => item.type === 'main');
    const sauces = data.filter(item => item.type === 'bun');

    return (
        <section className={`${styles.main__section_left} pt-10`}>
            <h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
            <BurgerIngredientNav/>
            <div className={`${global.section__scrollWrapper} scroll`}>
                <BurgerIngredientElements headerText={'Булки'} data={buns}/>
                <BurgerIngredientElements headerText={'Соусы'} data={sauces}/>
                <BurgerIngredientElements headerText={'Начинка'} data={mains}/>
            </div>
        </section>
    );
}

export default BurgerIngredients;