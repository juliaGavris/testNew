import * as data from './swagger-contract.json'


const dataNew = {...data['default']}
console.warn(dataNew)

const parser = (data) => {
  const paths = {...data.paths}
  const definitions = {...data.definitions}
  const result = Object.keys(paths).reduce((acc, elem) => {
    const current = {...paths[elem]["get"]}
    console.log(!current.parameters)
    if (!current.parameters) {
      return acc
    }
    const params = current.parameters.reduce((result, element) => {
      let obj = {}
      obj[element.name] = {...element}
      return {...result, ...obj}
    }, {})
    return {...acc, ...params}
  }, {})
  console.log(result)
  return result
}

console.warn(parser(dataNew))
