import React from "react";

import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";
import global from "../../index.module.css";

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(
        () => {
            fetch(DATA_URL)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        setData(response.data);
                        setLoading(true)
                    } else {
                        throw new SyntaxError("Данные некорректны");
                    }
                })
                .catch(() => alert("ERROR loading"));
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
            <div id="react-modals"></div>
        </>
    );
}

export default App;
