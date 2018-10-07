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
      obj[element.name] = Object.keys(element)
        .filter((elem) => {
          return (elem !== "name") && (elem !== "in")
        })
        .reduce((acc, elem) => {
          let obj = {}
          obj[elem] = element[elem]
          return {...acc, ...obj}
        }, {})
      return {...result, ...obj}
    }, {})
    return {...acc, ...params}
  }, {})
  console.log(result)
  return result
}

console.warn(parser(dataNew))
