import { createContext, useContext } from 'react';
import { RouterStore } from 'mobx-react-router';

import { AuthStore } from './auth.store';
import { RowsStore } from './rows.store';
import { OrdersStore } from './orders.store';

const routerStore = new RouterStore();
const authStore = new AuthStore();
const rowsStore = new RowsStore();
const ordersStore = new OrdersStore();

const stores = Object.freeze({
  routerStore,
  authStore,
  rowsStore,
  ordersStore,
});

const StoreContext = createContext(stores);

export const useStore = () => {
  return useContext(StoreContext);
};
