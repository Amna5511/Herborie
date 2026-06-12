import App from './App'
import { Home } from './layout/pages/Home'
import { NotFound } from './layout/pages/NotFound'
import { Login } from './features/auth/Login'
import { Register } from './features/auth/Register'
import { PlantDetail } from './features/plants/pages/PlantDetail'
import { PlantHome } from './features/plants/pages/PlantHome'
import { ProtectedPage } from './features/auth/components/ProtectedPage'
import { RecipesHome } from './features/plants/pages/RecipesHome'
import { ShoppingList } from './features/plants/pages/ShoppingList'
export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'plants',
        element: <ProtectedPage><PlantHome/></ProtectedPage>
      },
      { 
        path: 'plants/:id',
         element: <PlantDetail />
       },
       {
        path : 'recipes',
        element : <ProtectedPage><RecipesHome/></ProtectedPage>
       },
       {
        path : 'shopping-list',
        element : <ProtectedPage><ShoppingList></ShoppingList></ProtectedPage>
       },
      {
        path: 'auth',
        children: [
          { path: 'login',  
            element: <Login /> },
          { path: 'register',
            element: <Register /> },
        ]
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]