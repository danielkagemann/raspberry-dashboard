export interface DailyItem {
    hour: number,
    minute: number,
    text: string
}

interface InternalData {
    handle: any,
    callback: Function,
    list: DailyItem[]
}

const _data: InternalData = {
    handle: 0,
    callback: () => null,
    list: []
};

const _checkTime = () => {
    const now = new Date();
    const match = _data.list.find(item => item.hour === now.getHours() && item.minute === now.getMinutes());
    if (match) {
        _data.callback(match.text);
    }
}

export const InitializeDailyEvents = (list: DailyItem[], cb: Function) => {
    _data.list = [...list];
    _data.callback = cb;
    _data.handle = setInterval(_checkTime, 60 * 1000);
};
