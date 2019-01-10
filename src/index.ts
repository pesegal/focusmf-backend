import App from './App'
import config from 'config'

const port = config.get('port') || 3000

App.express.listen(port, (err: any) => {
  if (err) {
    return App.logger.error(err)
  }
  return App.logger.info(`Server is listening on ${port}.`)
})