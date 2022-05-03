import { all, select, takeLatest } from "redux-saga/effects";
import { IState } from "../..";
import { addProductToCart } from "./actions";
// takeLatest => cancela a ação feita anteriormente e faz uma nova (evita que o usuario clique e chame a api varias vezes)
// takeEvery => dispara a ação sempre e espera todas
// takeLeading => pega só a primeira ação, ignora as proximas ate essa primeira acabar

type CheckProductStockRequest = ReturnType<typeof addProductToCart>

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select( (state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
    })

    console.log(currentQuantity);
    
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART', checkProductStock)
])