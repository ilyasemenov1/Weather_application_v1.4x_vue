
export function updateSettings(settings, path, value) {
    const keys = path.split('.');
    const targetKey = keys.pop();
    let current = settings;
    for (let i = 0; i < keys.length; ++i) {
      current = current[keys[i]];
      if (!current) {
        throw new Error('Specified key not found. ' + keys[i]);
      }
    }
    current[targetKey] = value;
    return settings;
}

export function getSettingsValue(settings, path) {
    const keys = path.split('.');
    const targetKey = keys.pop();
    let current = settings;
    for (let i = 0; i < keys.length; ++i) {
      current = current[keys[i]];
      if (!current) {
        throw new Error('Specified key not found. ' + keys[i]);
      }
    }
    return current[targetKey];
}
