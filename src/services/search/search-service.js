import { exec } from "child_process"
import config from "../../../app.config"

class SearchService {
  constructor(commonOptions) {
    this.commonOptions = commonOptions ? commonOptions : {}
  }

  stringifyOptions = (options) => {
    let str = ""
    options = { ...options, ...this.commonOptions }
    Object.keys(options).forEach((optionName) => {
      const optionValue = options[optionName]
      if (typeof optionValue === "boolean" && optionValue) {
        str = `${str} --${optionName}`
      }
      else {
        str = `${str} --${optionName} ${optionValue}`
      }
    })
    return str
  }

  queryByExample = (videoId, exampleFile, options) => {
    return new Promise((resolve, reject) => {
      const command = `${config.commandPath.queryByExample} ${videoId} ${exampleFile} ${this.stringifyOptions(options)}`
      console.log(command)
      exec(command, (err, stdout, _) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(JSON.parse(stdout))
        }
      })
    })
  }

}

export default SearchService