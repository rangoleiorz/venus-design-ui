import isObject from 'lodash/isObject';
import globalConfig from './globalConfig';

function configure(config, mergeProps) {
  Object.keys(config).forEach(configKey => {
    const value = config[configKey];
    if (mergeProps && mergeProps.includes(configKey) && isObject(value)) {
      globalConfig.setValue(configKey, {
        ...globalConfig.getState[configKey],
        ...value,
      });
    } else {
      globalConfig.setValue(configKey, config[configKey]);
    }
  });
}

function getConfig(configKey) {
  const globalConfigState = globalConfig.getState();
  return configKey ? globalConfigState[configKey] : globalConfigState;
}

export { getConfig, configure };
