import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';

export interface Value {
    id: string,
    data: string,
    cost: number,
}

export interface Category {
    category: string,
    values: Value[]
}

export class CategoriesStore {
    @observable public isLoading: boolean = false;
    @observable public categories: Category[] | null = null;

    @action public load = (collactionName) => {
        this.isLoading = true;
        const firebaseCategories = app.firestore().collection(collactionName);
        return firebaseCategories.get()
            .then((snapshot) => {
                runInAction(() => {
                    this.isLoading = false;
                    this.categories = snapshot.docs.map(d => d.data()) as Category[]
                });
            });
    };
}
