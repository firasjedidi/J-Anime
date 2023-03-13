import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/Navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider , QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import {store,persistor} from './src/Redux-Store/Store'
import { ApolloProvider } from 'react-apollo';
import { client } from './src/utlis/graphql/client';
const queryClient = new QueryClient()
const Main = (props) =>{
  console.log(props);
  return(
   
      <RootNavigator />
   
  )
}
 {/* <PersistGate loading={null} persistor={persistor}> */}   {/* </PersistGate> */}
export default function App() {

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store} >
          <ApolloProvider client={client}>
            <Main/> 
          </ApolloProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

