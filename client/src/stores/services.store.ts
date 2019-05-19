import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';

export interface Service {
    name: string,
    price: number,
}

export class ServicesStore {
    @observable public isLoading: boolean = false;
    @observable public services: Service[] = [];

    @action public load = (collectionName) => {
        this.isLoading = true;
        const firebaseServices = app.firestore().collection(collectionName);
        return firebaseServices.get()
            .then((snapshot) => {
                runInAction(() => {
                    this.isLoading = false;
                    this.services = snapshot.docs.map(d => d.data()) as Service[]
                });
            });
    };
}
