import { action, computed, observable, runInAction } from 'mobx';

const BASE_URL = 'https://money.yandex.ru/api';

export class PaymentStore {
    @observable public instanceId = '';

    constructor() {
        this.init();
    }

    @action
    public async init() {
        const formData = new FormData();
        formData.append('client_id', process.env.REACT_APP_YANDEX_MONEY_CLIENT_ID!);

        const response = await fetch(`${BASE_URL}/instance-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });
        const { status, instance_id }: { status: string; instance_id: string } = await response.json();

        runInAction(async () => {
            const dataFromLS = localStorage.getItem('client_id');
            if (!dataFromLS) {
                localStorage.setItem('client_id', instance_id);
                this.instanceId = instance_id;
            }
        });
    }
}