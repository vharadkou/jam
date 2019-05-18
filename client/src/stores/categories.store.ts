import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';

export interface Value {
    id: string,
    data: string,
}

export interface Category {
    category: string,
    values: Value[]
}

export class CategoriesStore {
    @observable public isLoading: boolean = false;
    @observable public categories: Category[] | null = null;
    private firebaseCategories = app.firestore().collection('categories');

    public constructor() {
        this.init();
    }

    @action public init = () => {
        this.isLoading = true;
        this.firebaseCategories.get()
            .then((snapshot) => {
                runInAction(() => {
                    this.isLoading = false;
                    this.categories = snapshot.docs.map(d => d.data()) as Category[]
                });
            });
    };
}
