type TLocationProps = {
    pathname?: string;
    state: {
        baseUrl: string;
        id: string;
    };
};

interface IHeaderNavElement {
    iconType: string;
    text: string;
    url: string;
}

interface IIngredient {
    _id: string;
    uniqueId?: string;
    index?: number;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}