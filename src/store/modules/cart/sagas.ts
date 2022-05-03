import { all, takeLatest } from "redux-saga/effects";

function checkProductStock() {
    console.log('Adicionou ao carrinho');
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART', checkProductStock)
    // takeLatest => cancela a ação feita anteriormente e faz uma nova (evita que o usuario clique e chame a api varias vezes)
    // takeEvery => dispara a ação sempre e espera todas
    // takeLeading => pega só a primeira ação, ignora as proximas ate essa primeira acabar
])