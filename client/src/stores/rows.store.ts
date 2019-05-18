import { observable, runInAction } from 'mobx';
import { app } from 'firebase.config';

export class RowsStore {
  @observable public rows?: any[];

  private firebaseRows = app.firestore().collection('rows');

  public constructor() {
    this.firebaseRows.onSnapshot(snapshot => {
      runInAction(() => (this.rows = snapshot.docs.map(d => d.data())));
    });
  }

  public addRow = () => {
    this.firebaseRows.add({ value: 'demo row!' });
  };
}
