import { action, observable, runInAction } from 'mobx';
import { app } from 'firebase.config';

export class OrdersStore {
    @observable public Orders?: any[];
    @observable public isLoading = false;
    @observable public isAddInProgress = false;

    private ordersCollection = app.firestore().collection('orders');

    public constructor() {
        this.isLoading = true;
        this.ordersCollection.onSnapshot(snapshot => {
            runInAction(() => {
                this.Orders = snapshot.docs.map(d => d.data());
                this.isLoading = false;
            });
        });
    }

    @action public addRow = async (order) => {
        this.isAddInProgress = true;
        await this.ordersCollection.add(order)
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
