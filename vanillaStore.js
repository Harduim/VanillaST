const ADD = 'ADD'
const REMOVE = 'REMOVE'
const BULK_REPLACE = 'BULK_REPLACE'
const ALL = 'ALL'

const store = (state = {}) => {
  const _state = state
  // {callback: f(), dataTypes: []}
  const _callbacks = []

  const update = (data, dataType, action, idKey) => {
    if (!_state[dataType]) _state[dataType] = []

    switch (action) {
      case ADD:
        _state[dataType] = _state[dataType].concat(...data)
        break
      case REMOVE:
        _state[dataType] = Array.from(_state[dataType].filter(e => data[idKey] !== e[idKey]))
        break
      case BULK_REPLACE:
        _state[dataType] = [...data]
        break
      default:
        console.log('No Action taken')
    }

    _callbacks.forEach(
      c => {
        const { callback, dataTypes } = c
        if (!dataTypes.includes(dataType)) return
        for (const dt of dataTypes) {
          if (!Object.keys(_state).includes(dt)) return
        }
        callback(Object.assign(_state))
      }
    )
  }

  const subscribe = (callback, dataTypes) => {
    _callbacks.push({ callback, dataTypes })
  }

  return [update, subscribe]
}
