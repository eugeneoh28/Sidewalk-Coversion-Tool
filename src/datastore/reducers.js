const todos = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_FEATURE':
      return Object.assign({}, state, {
        features: [
          ...state.features,
          {
            id: action.id,
            linestring: action.linestring
          }
        ]
      })

    case 'ADD_METADATA':
      return Object.assign({}, state, {
        features: state.features.map((feature, index) => {
          if (feature.id == action.id) {
            return Object.assign({}, feature, {
              metadata : action.metadata
            })
          }
          return feature
        })
      })

    case 'REMOVE_FEATURE':
      return Object.assign({}, state, {
        features: state.features.map((feature, index) => {
          if (feature.id != action.id) {
            return feature;
          }
        })
      })

    case 'REMOVE_METADATA':
      return Object.assign({}, state, {
        features: state.features.map((feature, index) => {
          if (feature.id == action.id) {
            return {
              id: feature.id,
              linestring: feature.linestring
            }
          }
          return feature
        })
      })

    case 'HIGHLIGHT_FEATURE':
      return Object.assign({}, state, {
        highlighted: action.id
      })

    default:
      return state
  }
}

export default todos