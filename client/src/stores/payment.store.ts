import { action, observable, runInAction } from 'mobx';

const METHOD_DATA = [{
  supportedMethods: "basic-card",
  data: {
    supportedNetworks: ["visa", "mastercard", "amex"],
    supportedTypes: ["credit", "debit"]
  }
}];

interface PayItem {
  label: string;
  value: string;
}


export class PaymentStore {
  public readonly currency = 'BYN';

  @action
  public async showPayment(items: PayItem[]) {
    const mapItems = items.map(item => ({
      label: item.label, amount: { currency: this.currency, value: item.value }
    }))

    const total = items.reduce((prev, next) => prev + +next.value, 0);

    if (PaymentRequest) {
      const payment = new PaymentRequest(METHOD_DATA, {
        displayItems: mapItems,
        total: {
          amount: {
            value: String(total),
            currency: this.currency,
          },
          label: 'Total'
        }
      });
      const canMakePayment = await payment.canMakePayment();
      if (canMakePayment) {
        await payment.show();
      }
    }
    else {

    }
  }
}