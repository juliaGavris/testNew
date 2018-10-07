import * as data from './swagger-contract.json'

const dataNew = {...data['default']}

// const func = (
//   const func = () => {}
//   return func
// )();

const parseData = (_data_) => {
  const dataPaths = {..._data_.paths}
  return Object.keys(dataPaths).reduce(
    (parsedData, elem) => {
      const currentGet = {...dataPaths[elem]['get']}
      if (!currentGet.parameters || !currentGet.parameters.length) {
        return parsedData
      }
      const parsedParameters = parseParameters(currentGet.parameters)
      return {...parsedData, ...parsedParameters}
  }, {})
}

const parseParameters = (parameters) => {
  const parsedParameters = {}
  for (let i = 0, l = parameters.length; i < l; i++) {
    const parameter = parameters[i];
    parsedParameters[`${parameter.name}`] = parseParameter(parameter)
  }
  return parsedParameters
}

const parseParameter = (parameter) => {
  const parsedParameter = {}
  for (let key in parameter) {
    if (key === 'schema') {
      const dataFromSchema = getDataFromSchema(parameter.schema['$ref'])
      parsedParameter[key] = dataFromSchema
    } else if (key !== 'name' && key !== 'in') {
      parsedParameter[key] = parameter[key]
    }
  }
  return parsedParameter
}

const getDataFromSchema = (ref) => {
  const path = ref.replace('#/definitions/', '');
  return {...dataNew.definitions[path]['properties']}
}

console.warn(parseData(dataNew))
