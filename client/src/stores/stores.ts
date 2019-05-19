import { createContext, useContext } from 'react';
import { RouterStore } from 'mobx-react-router';

import { AuthStore } from './auth.store';
import { RowsStore } from './rows.store';
import { OrdersStore } from './orders.store';
import { CategoriesStore } from './categories.store';
import { ServicesStore } from './services.store';
import { PaymentStore } from './payment.store';

const routerStore = new RouterStore();
const authStore = new AuthStore();
const rowsStore = new RowsStore();
const ordersStore = new OrdersStore();
const categoriesStore = new CategoriesStore();
const paymentStore = new PaymentStore();
const servicesStore = new ServicesStore();

const stores = Object.freeze({
  routerStore,
  authStore,
  rowsStore,
  ordersStore,
  categoriesStore,
  paymentStore,
  servicesStore,
});

const StoreContext = createContext(stores);

export const useStore = () => {
  return useContext(StoreContext);
};
