import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';
import firebase from 'firebase';
import { auth } from 'firebaseui';

export class AuthStore {
  @observable public isLoading: boolean = false;
  @observable public user: firebase.User | null = null;
  @observable public userData?: any;

  private authConfig: auth.Config = this.getAuthConfig();
  private authUi: auth.AuthUI = this.getAuthUi();

  private users$ = app.firestore().collection('users');
  private usersUnsubscribe: any;

  public constructor() {
    this.init();
  }

  @action public init = () => {
    this.isLoading = true;

    firebase.auth().onAuthStateChanged(user => {
      runInAction(async () => {
        this.user = user;

        if (this.user && !this.usersUnsubscribe) {
          this.usersUnsubscribe = this.users$.doc(this.user.phoneNumber!).onSnapshot(userData => {
            this.userData = userData.data();
            this.isLoading = false;
          })
        } else {
          this.usersUnsubscribe();
          this.usersUnsubscribe = undefined;
        }
      });
    });
  };

  @action public login = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await app.auth().signInWithPopup(googleProvider);
  };

  @action public logout = async () => {
    await app.auth().signOut();
  };

  @action public startAuthUi = (element: Element) => {
    this.authUi.start(element, this.authConfig);
  };

  @action public updateUser = async (role: string) => {
    if (this.user) {
      const userId = this.user.phoneNumber!;
      await this.users$.doc(userId).set({
        role
      });
    }
  }

  private getAuthUi(): auth.AuthUI {
    return new auth.AuthUI(firebase.auth());
  }

  private getAuthConfig(): auth.Config {
    return {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: { size: 'invisible' },
          defaultCountry: 'BY',
        },
      ],
      signInSuccessUrl: '/home',
      signInFlow: 'redirect',
    };
  }
}
