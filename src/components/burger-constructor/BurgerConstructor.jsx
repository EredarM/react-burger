import ConstructorNavElement from "./constructor-nav-element/ConstructorNavElement";
import ConstructorElement from "./constructor-element/ConstructorElement";

import styles from './BurgerConstructor.module.css';
import global from '../../index.module.css';

import data from '../../utils/data';

const BurgerConstructor = () => {
    const buns = data.filter(item => item.type === 'bun');
    const mains = data.filter(item => item.type === 'main');
    const sauces = data.filter(item => item.type === 'bun');

    return (
        <section className={`${styles.main__section_left} pt-10`}>
            <h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
            <ConstructorNavElement/>
            <div className={`${global.section__scrollWrapper} scroll`}>
                <ConstructorElement headerText={'Булки'} data={buns}/>
                <ConstructorElement headerText={'Соусы'} data={sauces}/>
                <ConstructorElement headerText={'Начинка'} data={mains}/>

            </div>
        </section>
    );
}

export default BurgerConstructor;