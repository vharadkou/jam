import { action, observable, runInAction } from 'mobx';
import { app } from 'firebase.config';

export class OrdersStore {
    @observable public Orders?: any[];
    @observable public isLoading = false;
    @observable public isAddInProgress = false;

    private ordersCollection = app.firestore().collection('orders');

    @action public addRow = async (order, phoneNumber) => {
        this.isAddInProgress = true;
        const newOrder = {
            phoneNumber: phoneNumber,
            order: {
                name: order.requestName.value,
                date: order.preferredTime,
                services: [],
                status: 'Рассматривается',
            },
        };

        await this.ordersCollection.add(newOrder)
        runInAction(() => {
            this.isAddInProgress = false;
        });
    };

    @action public load = async (phoneNumber) => {
        this.isLoading = true;
        const snapshot = await this.ordersCollection
            .where('phoneNumber', '==', phoneNumber)
            .get()
        this.Orders = snapshot.docs.map(d => d.data())
        runInAction(() => this.isLoading = false);
    }
}
