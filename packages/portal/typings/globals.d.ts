import { History } from 'history'
import { compose } from 'redux'
import { WebStorage } from 'redux-persist/es/types'

import { Configurations } from './configuration'

declare global {
  interface Window {
    env: Configurations
    historyInstance?: History
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
  const __ENV__: string
  const __VERSION__: string

  namespace Service {
    interface Error {
      code: number;
      type: string;
      message: string;
    }
  }

  namespace Reducer {
    type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

    interface PersistConfig<T> {
      key: string;
      version: number;
      whitelist: (Extract<keyof T, string>)[];
      storage?: WebStorage;
    }
  }
}
