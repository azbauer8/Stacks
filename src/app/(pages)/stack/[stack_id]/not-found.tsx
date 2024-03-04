import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/general/PageHeader"

export default function StackNotFound() {
  return (
    <div>
      <PageHeader>
        <PageTitle>Stack Not Found</PageTitle>
        <PageDescription>No stack exists with the provided id</PageDescription>
      </PageHeader>
    </div>
  )
}
