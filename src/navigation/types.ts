export type TRoute = {
    id: number
    path: string
    element: JSX.Element
    children?: TRoute[]
}