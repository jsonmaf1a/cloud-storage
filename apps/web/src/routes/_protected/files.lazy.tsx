import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/files')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col">
      Hello /files!
      <Link to={'/'}>To dashboard</Link>
      <Link to={'/trash'}>To trash</Link>
    </div>
  )
}
