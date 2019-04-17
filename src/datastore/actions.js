let featureID = 0;

export const addFeature = (linestring) => ({
    type: 'ADD_FEATURE',
    id : featureID++,
    linestring: linestring
})

export const addMetadata = (id, data) => ({
    type: 'ADD_METADATA',
    id,
    data
})

export const removeFeature = (id) => ({
    type: 'REMOVE_FEATURE',
    id
})

export const removeMetaData = (id) => ({
    type: 'REMOVE_METADATA',
    id
})

export const highlightFeature = (id) => ({
    type: 'HIGHLIGHT_FEATURE',
    id
})