import React from "react";

import ConstructorNavElement from "./constructor-nav-element/ConstructorNavElement";
import ConstructorElement from "./constructor-element/ConstructorElement";

import styles from './BurgerConstructor.module.css';
import global from '../../index.module.css';

import data from '../../utils/data';

class BurgerConstructor extends React.Component {
    render() {
        return (
            <section className={`${styles.main__section_left} pt-10`}>
                <h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
                <ConstructorNavElement/>
                <div className={`${global.section__scrollWrapper} scroll`}>
                    <ConstructorElement headerText={'Булки'} data={data.filter(item => item.type === 'bun')}/>
                    <ConstructorElement headerText={'Соусы'} data={data.filter(item => item.type === 'sauce')}/>
                    <ConstructorElement headerText={'Начинка'} data={data.filter(item => item.type === 'main')}/>

                </div>
            </section>
        );
    }
}

export default BurgerConstructor;