import PropTypes from 'prop-types';

export const dataProps = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,

            image_large: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired
        }).isRequired
    )
};

export const dataProps2 = {
    id: PropTypes.string.isRequired,
    imgPath: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export const dataProps3 = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
};

export const dataOrderPost = {
    orderData: PropTypes.shape({
        name: PropTypes.string,
        order: PropTypes.shape({
            number: PropTypes.number
        }),
        success: PropTypes.bool
    })
}