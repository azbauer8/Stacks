import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/general/PageHeader"

export default function UserNotFound() {
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
