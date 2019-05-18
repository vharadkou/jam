import { observable, action, runInAction } from 'mobx';
import { app } from 'firebase.config';
import firebase from 'firebase';
import { auth } from 'firebaseui';

export class AuthStore {
  @observable public isLoading: boolean = false;
  @observable public user: firebase.User | null = null;

  private authConfig: auth.Config = this.getAuthConfig();
  private authUi: auth.AuthUI = this.getAuthUi();

  public constructor() {
    this.init();
  }

  @action public init = () => {
    this.isLoading = true;

    firebase.auth().onAuthStateChanged(user => {
      runInAction(() => {
        this.user = user;
        this.isLoading = false;
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
