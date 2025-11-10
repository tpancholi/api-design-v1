import {app} from './server'
import {env} from '../env'

app.listen(env.PORT, () => {
    console.log(`server running on port ${env.PORT}`)
});