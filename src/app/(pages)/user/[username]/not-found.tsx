import { PageDescription, PageHeader, PageTitle } from "@/components/PageHeader"

export default function NotFound() {
  return (
    <div>
      <PageHeader>
        <PageTitle>User Not Found</PageTitle>
        <PageDescription>
          No user exists with the provided username
        </PageDescription>
      </PageHeader>
    </div>
  )
}
