import React from "react";

import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients} from '../../utils/burger-api';

import styles from "./app.module.css";
import global from "../../index.module.css";

const App = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(
        () => {
            getIngredients()
                .then(response => {
                    if (response.success) {
                        setData(response.data);
                        setLoading(true)
                    } else {
                        throw new Error();
                    }
                })
                .catch(() => alert("Ошибка загрузка данных"));
        },
        []
    );

    return (
        <>
            <AppHeader/>
            {
                loading && (
                    <main className={`${styles.main} pb-10`}>
                        <div className={`${global.container} ${styles.main__wrapper}`}>
                            <BurgerIngredients data={data}/>
                            <BurgerConstructor data={data}/>
                        </div>
                    </main>
                )
            }
        </>
    );
}

export default App;
