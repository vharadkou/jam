import { action, observable, runInAction } from 'mobx';
import { app } from 'firebase.config';
import uuidv4 from 'uuid/v4';

export class OrdersStore {
    @observable public Orders?: any[];
    @observable public ordersQuery?: firebase.firestore.QueryDocumentSnapshot[];
    @observable public isLoading = false;
    @observable public isAddInProgress = false;

    private usersCollection = app.firestore().collection('users');
    private ordersCollection = app.firestore().collection('orders');

    @action public addRow = async (order, phoneNumber) => {
        this.isAddInProgress = true;
        const newOrder = {
            number: uuidv4(),
            phoneNumber: phoneNumber,
            executor: null,
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
            setTimeout(() => { this.findExecuter(newOrder) }, 10000);
        });
    };

    @action public findExecuter = async (order) => {
        const editOrder = this.ordersQuery!.find(o => o.data().number === order.number);

        if (editOrder) {
            const executor = (await this.getExecuterPhineName()).id
            console.log('DDD', executor);
            await this.ordersCollection.doc(editOrder.id).update({
                order: {
                    ...order.data().order,
                    executor: executor,
                    status: 'Принята',
                }
            });
        }
    }

    public getExecuterPhineName = async () => {
        const usersSnapshot = await this.usersCollection.get();
        const users = usersSnapshot.docs
            .map(d => d.data()).filter((user) => user.role === 'employee');
        return users[0];
    }

    @action public load = async (phoneNumber) => {
        this.isLoading = true;
        const snapshot = await this.ordersCollection
            .where('phoneNumber', '==', phoneNumber)
            .get()

        this.ordersQuery = snapshot.docs;

        this.Orders = snapshot.docs.map(d => d.data())
        runInAction(() => this.isLoading = false);
    }

    @action public updatePaymentStatus = async (number: number) => {
        const order = this.ordersQuery!.find(order => order.data().number === number);

        if (order) {
            await this.ordersCollection.doc(order.id).update({
                order: {
                    ...order.data().order,
                    status: 'Оплачено'
                }
            });
        }
    }
}
