import { PageDescription, PageHeader, PageTitle } from "@/components/PageHeader"

export default function NotFound() {
  return (
    <div>
      <PageHeader>
        <PageTitle>Stack Not Found</PageTitle>
        <PageDescription>No stack exists with the provided id</PageDescription>
      </PageHeader>
    </div>
  )
}
