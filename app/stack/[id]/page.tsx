import StackLoader from "./StackLoader"

export default async function StackPage({
  params,
}: {
  params: { id: string }
}) {
  return <StackLoader id={params.id} />
}
