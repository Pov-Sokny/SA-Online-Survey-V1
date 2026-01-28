import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "./features/auth/auth-api"
import authReducer from "./features/auth/auth-slice"
import { filesApi } from "./features/files/files-api"
import filesReducer from "./features/files/files-slice"
import surveyReducer from "./features/surveys/survey-slice"
import { surveyApi } from "./features/surveys/surveys-api"
import { publicSurveyApi } from "./features/surveys/public-survey-api"

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
      [filesApi.reducerPath]: filesApi.reducer,
      files: filesReducer,
      [surveyApi.reducerPath]: surveyApi.reducer,
      survey: surveyReducer,
      [publicSurveyApi.reducerPath]: publicSurveyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        filesApi.middleware,
        surveyApi.middleware,
        publicSurveyApi.middleware // ✅ REQUIRED
      ),

  })

  setupListeners(store.dispatch)
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
