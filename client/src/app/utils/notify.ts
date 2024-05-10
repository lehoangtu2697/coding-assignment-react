
import notify from 'devextreme/ui/notify';

export async function successNotify(message: string) {
    notify({
        message: message,
        type: 'success',
        width: 400,
    }, {
        direction: "up-push",
        position: "bottom right",
    });
}

export async function errorNotify(message: string) {
    notify({
        message: message,
        type: 'error',
        width: 400,
    }, {
        direction: "up-push",
        position: "bottom right",
    });
}