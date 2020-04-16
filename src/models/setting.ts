import defaultSettings, { DefaultSettings } from '../../config/defaultSettings'

export interface SettingModelType {
    namespace: 'settings';
    state: DefaultSettings;
    reducers: {

    }
}

const SettingModel: SettingModelType = {
    namespace: 'settings',

    state: defaultSettings,

    reducers: {

    }
}

export default SettingModel