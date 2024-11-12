import { OrderDTO } from "../models/order";
import * as cartRepository from "../localstorage/cart-repository";

export function saveCart(order: OrderDTO) {
    cartRepository.save(order);
}

export function getCart() : OrderDTO {
    return cartRepository.get();
}