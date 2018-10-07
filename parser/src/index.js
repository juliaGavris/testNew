import * as data from './swagger-contract.json'


const dataNew = {...data['default']}
console.warn(dataNew)

const getDataFromPath = (path) => {
  const section = path.split("definitions/")[1]
  const obj = {...dataNew.definitions[section]["properties"]}
  return obj
}

const parser = (data) => {
  const paths = {...data.paths}
  const result = Object.keys(paths).reduce((acc, elem) => {
    const current = {...paths[elem]["get"]}
    if (!current.parameters) {
      return acc
    }
    const params = current.parameters.reduce((result, element) => {
      let obj = {}
      obj[element.name] = Object.keys(element)
        .reduce((acc, elem) => {
          if ((elem === "name") || (elem === "in")) {
            return acc
          } else if (elem === "schema") {
            const data = getDataFromPath(element.schema["$ref"])
            return {...acc, schema: data}
          }
          return {...acc, [`${elem}`]: element[elem]}
        }, {})
      return {...result, ...obj}
    }, {})
    return {...acc, ...params}
  }, {})
  console.log(result)
  return result
}

console.warn(parser(dataNew))


