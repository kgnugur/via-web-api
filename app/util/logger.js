/**
 * @author thenrerise@gmail.com (Hamit Zor)
 */

import fs from "fs"
import path from "path"
import moment from "moment"
import clc from "cli-color"
import fetchConfig from "../util/config-fetcher"



class Logger {

  constructor(directory) {
    this._directory = directory
    this._supress = !fetchConfig("logging:enabled")
  }

  _date = () => moment().format("DD_MM_YYYY")
  _time = () => moment().format("LTS")
  _path = () => path.resolve(this._directory, `${this._date()}.log`)


  _log = (message) => {
    const time = this._time()
    const path = this._path()

    !this._supress && fs.appendFile(path, `${time} : ${message}\n`,
      err => {
        if (err) {
          console.log(clc.red(
            `${time} : ERROR - Cannot log message 
          \n"${message}"
          \nto file ${path}.
          \nError Message=${err.message}
          \nStack=${err.stack}\n`
          ))
        }
      })
  }


  info = (message) => {
    !this._supress && this._log(`INFO - ${message}`)
  }

  error = (errorObject) => {
    !this._supress && this._log(`ERROR - ${errorObject.message}\nstacktrace: ${errorObject.stack}`)
  }


}


export default Logger