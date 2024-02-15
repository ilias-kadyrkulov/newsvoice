import { Route, Routes } from 'react-router-dom'
import { routes } from './navigation.data'

export const Navigation = () => {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((child) => (
                <Route key={child.id} path={child.path} element={child.element} />
              ))}
          </Route>
        ))}
      </Routes>
    </>
  )
}
