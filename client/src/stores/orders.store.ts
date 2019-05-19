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
        address: order.address.description ? order.address.description : null,
        services: [{
          count: 1,
          name: order.requestName.value,
          price: order.requestName.cost,
        }],
        status: 'Рассматривается',
      },
    };

    await this.ordersCollection.add(newOrder)
    runInAction(() => {
      this.isAddInProgress = false;
    });

    await this.findExecuter(newOrder);
  };

  @action public findExecuter = async (order) => {
    const snapshot = await this.ordersCollection
      .where('phoneNumber', '==', order.phoneNumber)
      .get();

    const editOrder = snapshot.docs.find(o => o.data().number === order.number);

    if (editOrder) {
      const executor = (await this.getExecuterPhineName());
      console.log('DDD', executor);
      await this.ordersCollection.doc(editOrder.id).update({
        order: {
          ...editOrder.data().order,
          status: 'Принята',
        },
        executor,
      });
    }
  }

  public getExecuterPhineName = async () => {
    const usersSnapshot = await this.usersCollection.where('role', '==', 'employee').get();

    const users: any[] = [];
    usersSnapshot.forEach(userSnapshot => users.push(userSnapshot.id));
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

  @action public loadAsMaster = async (phoneNumber) => {
    this.isLoading = true;
    const snapshot = await this.ordersCollection
      .where('executor', '==', phoneNumber)
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

  @action public updateStatus = async (number: number, status: string) => {
    const order = this.ordersQuery!.find(order => order.data().number === number);

    if (order) {
      await this.ordersCollection.doc(order.id).update({
        order: {
          ...order.data().order,
          status: status,
        }
      });
    }
  }
}
