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
    @observable public total: number = 0;
    @observable public items: PaymentItem[] = [];

    @action
    public async showPayment() {
        if (PaymentRequest) {
            const payment = new PaymentRequest(METHOD_DATA, {
                displayItems: this.items,
                total: {
                    amount: {
                        value: String(this.total),
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

    @action
    public calculateTotal() {
        let total = 0;
        this.items.forEach((item) => {
            total += +item.amount.value;
        });

        this.total = total;
    }

    @action
    public appendItem({ label, value }: PayItem) {
        this.items.push({ label, amount: { currency: this.currency, value } });
        runInAction(() => this.calculateTotal())
    }

    @action
    public removeItemByIndex(index: number) {
        this.items.splice(index, 1);
        runInAction(() => this.calculateTotal());
    }
}