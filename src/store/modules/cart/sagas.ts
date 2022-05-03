import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import { AxiosResponse } from "axios";
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from "./actions";
// takeLatest => cancela a ação feita anteriormente e faz uma nova (evita que o usuario clique e chame a api varias vezes)
// takeEvery => dispara a ação sempre e espera todas
// takeLeading => pega só a primeira ação, ignora as proximas ate essa primeira acabar

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select( (state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
    })

    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

    if(availableStockResponse.data.quantity > currentQuantity) {
        yield put(addProductToCartSuccess(product))
    } else {
        yield put(addProductToCartFailure(product.id))
    }
    
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
])